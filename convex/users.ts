/**
 * User mutations & queries — SchoolCBT
 */
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// ── Upsert user after Firebase sign-in ────────────────────────────────────
export const upsertUser = mutation({
	args: {
		uid: v.string(),
		name: v.string(),
		email: v.string(),
		role: v.optional(v.union(v.literal('student'), v.literal('tutor'), v.literal('admin'))),
		level: v.optional(v.string()),
		school: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		const existing = await ctx.db
			.query('users')
			.withIndex('by_uid', (q) => q.eq('uid', args.uid))
			.unique();

		if (existing) {
			await ctx.db.patch(existing._id, { lastActive: now });
			return { userId: existing._id, created: false };
		}

		const userId = await ctx.db.insert('users', {
			uid: args.uid,
			name: args.name,
			email: args.email,
			role: args.role ?? 'student',
			level: args.level ?? 'SSS',
			school: args.school,
			streak: 0,
			lastActive: now,
			subscriptionPlan: 'free',
			subscriptionStatus: 'active' // Defaulted to active for free plan on first join
		});
		return { userId, created: true };
	}
});

// ── Get user by Firebase UID ────────────────────────────────────────────────
export const getUserByUid = query({
	args: { uid: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('users')
			.withIndex('by_uid', (q) => q.eq('uid', args.uid))
			.unique();
	}
});

// ── Get user dashboard stats ───────────────────────────────────────────────
export const getUserStats = query({
	args: { userId: v.id('users') },
	handler: async (ctx, args) => {
		const user = await ctx.db.get(args.userId);
		if (!user) return null;

		const batches = await ctx.db
			.query('batches')
			.withIndex('by_user', (q) => q.eq('userId', args.userId))
			.order('desc')
			.take(20);

		const totalBatches = batches.length;
		const avgScore =
			totalBatches > 0
				? Math.round(batches.reduce((acc, b) => acc + (b.score / b.total) * 100, 0) / totalBatches)
				: 0;

		const passProbability = Math.min(100, Math.round(avgScore * 0.6 + 40));

		const logs = await ctx.db
			.query('activityLogs')
			.withIndex('by_user', (q) => q.eq('userId', args.userId))
			.order('desc')
			.take(5);

		return {
			user,
			totalBatches,
			avgScore,
			passProbability,
			streak: user.streak,
			recentActivity: logs,
			recentBatches: batches.slice(0, 5)
		};
	}
});

// ── Update streak ──────────────────────────────────────────────────────────
export const updateStreak = mutation({
	args: { userId: v.id('users') },
	handler: async (ctx, args) => {
		const now = Date.now();
		const user = await ctx.db.get(args.userId);
		if (!user) return;
		const dayMs = 24 * 60 * 60 * 1000;
		const newStreak = now - user.lastActive < dayMs ? user.streak + 1 : 1;
		await ctx.db.patch(args.userId, { streak: newStreak, lastActive: now });
		return { streak: newStreak };
	}
});

// ── Update subscription plan ───────────────────────────────────────────────
export const updateSubscription = mutation({
	args: {
		userId: v.id('users'),
		plan: v.union(
			v.literal('free'),
			v.literal('student'),
			v.literal('tutor'),
			v.literal('institution')
		),
		expiryMs: v.optional(v.number())
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.userId, {
			subscriptionPlan: args.plan,
			subscriptionExpiry: args.expiryMs
		});
		await ctx.db.insert('activityLogs', {
			userId: args.userId,
			action: 'Subscription Updated',
			meta: `plan:${args.plan}`,
			timestamp: Date.now()
		});
		return { updated: true };
	}
});
