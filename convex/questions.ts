import { mutation, query, action } from './_generated/server';
import { v } from 'convex/values';

// ── Cache key builder ────────────────────────────────────────────────────────
function buildCacheKey(subject: string, level: string, exam: string, topic?: string): string {
	return `q:${level}:${subject}:${exam}:${topic ?? 'all'}`.toLowerCase().replace(/\s+/g, '_');
}

// ── Get randomized questions from cache or generate ─────────────────────────
export const getRandomizedBatch = query({
	args: {
		subject: v.string(),
		level: v.string(),
		exam: v.string(),
		topic: v.optional(v.string()),
		limit: v.number()
	},
	handler: async (ctx, args) => {
		// 1. Try indexed subject query first
		const pool = await ctx.db
			.query('questions')
			.withIndex('by_subject', (q) => q.eq('subject', args.subject))
			.filter((q) => q.eq(q.field('level'), args.level))
			.collect();

		if (pool.length === 0) return [];

		// 2. Filter by topic if specified
		const filtered =
			args.topic && args.topic !== 'All Topics'
				? pool.filter((q) => q.bloom === args.topic || q.text.includes(args.topic!))
				: pool;

		const source = filtered.length > 0 ? filtered : pool;

		// 3. Deterministic shuffle using Fisher-Yates variant seeded by time bucket
		const seed = Math.floor(Date.now() / 3_600_000); // changes every hour
		const shuffled = [...source].sort((a, b) => {
			const ha = hashCode(a._id + seed);
			const hb = hashCode(b._id + seed);
			return ha - hb;
		});

		return shuffled.slice(0, Math.min(args.limit, shuffled.length));
	}
});

// ── Bulk insert questions into the bank ─────────────────────────────────────
export const bulkInsertQuestions = mutation({
	args: {
		questions: v.array(
			v.object({
				text: v.string(),
				options: v.array(v.object({ letter: v.string(), text: v.string() })),
				correct: v.string(),
				explanation: v.string(),
				subject: v.string(),
				level: v.string(),
				exam: v.string(),
				bloom: v.string(),
				year: v.optional(v.number()),
				verified: v.optional(v.boolean())
			})
		)
	},
	handler: async (ctx, args) => {
		const inserted: string[] = [];
		for (const q of args.questions) {
			// Deduplicate by text fingerprint
			const existing = await ctx.db
				.query('questions')
				.withIndex('by_subject', (idx) => idx.eq('subject', q.subject))
				.filter((f) => f.eq(f.field('text'), q.text))
				.first();

			if (!existing) {
				const id = await ctx.db.insert('questions', q);
				inserted.push(id);
			}
		}
		return { inserted: inserted.length };
	}
});

// ── Save a completed batch with all answer metadata ──────────────────────────
export const saveBatchResult = mutation({
	args: {
		userId: v.id('users'),
		subject: v.string(),
		score: v.number(),
		total: v.number(),
		questionIds: v.array(v.id('questions')),
		examType: v.optional(v.string()),
		durationMs: v.optional(v.number())
	},
	handler: async (ctx, args) => {
		const timestamp = Date.now();
		await ctx.db.insert('batches', {
			userId: args.userId,
			subject: args.subject,
			score: args.score,
			total: args.total,
			questions: args.questionIds,
			timestamp,
			examType: args.examType,
			durationMs: args.durationMs
		});

		// Update user streak
		const user = await ctx.db.get(args.userId);
		if (user) {
			const dayMs = 86_400_000;
			const newStreak =
				timestamp - user.lastActive < dayMs ? user.streak + 1 : 1;
			await ctx.db.patch(args.userId, { streak: newStreak, lastActive: timestamp });
		}

		// Activity log
		await ctx.db.insert('activityLogs', {
			userId: args.userId,
			action: 'Completed Batch',
			meta: `${args.subject}: ${args.score}/${args.total}`,
			timestamp
		});
	}
});

// ── User batch history ───────────────────────────────────────────────────────
export const getUserBatches = query({
	args: { userId: v.id('users'), limit: v.optional(v.number()) },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('batches')
			.withIndex('by_user', (q) => q.eq('userId', args.userId))
			.order('desc')
			.take(args.limit ?? 20);
	}
});

// ── Question bank stats ──────────────────────────────────────────────────────
export const getBankStats = query({
	args: {},
	handler: async (ctx) => {
		const total = await ctx.db.query('questions').collect();
		const bySubject: Record<string, number> = {};
		for (const q of total) {
			bySubject[q.subject] = (bySubject[q.subject] ?? 0) + 1;
		}
		return { total: total.length, bySubject };
	}
});

// ── Flush expired API cache entries ─────────────────────────────────────────
export const flushExpiredCache = mutation({
	args: {},
	handler: async (ctx) => {
		const now = Date.now();
		const expired = await ctx.db
			.query('apiCache')
			.withIndex('by_expiresAt', (q) => q.lt('expiresAt', now))
			.collect();
		for (const e of expired) {
			await ctx.db.delete(e._id);
		}
		return { flushed: expired.length };
	}
});

// ── Helpers ──────────────────────────────────────────────────────────────────
function hashCode(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
	}
	return hash;
}
