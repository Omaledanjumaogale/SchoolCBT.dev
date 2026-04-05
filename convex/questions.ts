import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getBatch = query({
	args: {
		subject: v.string(),
		level: v.string(),
		limit: v.number()
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query('questions')
			.withIndex('by_subject', (q) => q.eq('subject', args.subject))
			.filter((q) => q.eq(q.field('level'), args.level))
			.take(args.limit);
	}
});

export const saveBatchResult = mutation({
	args: {
		userId: v.id('users'),
		subject: v.string(),
		score: v.number(),
		total: v.number(),
		questionIds: v.array(v.id('questions'))
	},
	handler: async (ctx, args) => {
		const timestamp = Date.now();
		await ctx.db.insert('batches', {
			userId: args.userId,
			subject: args.subject,
			score: args.score,
			total: args.total,
			questions: args.questionIds,
			timestamp
		});

		// Update user streak if active within last 24h
		const user = await ctx.db.get(args.userId);
		if (user) {
			const dayInMs = 24 * 60 * 60 * 1000;
			let newStreak = user.streak;
			if (timestamp - user.lastActive < dayInMs) {
				// Active within 24h, streak continues if it was yesterday
				// For simplicity, just incrementing if last active was > 0
				newStreak += 1;
			} else {
				newStreak = 1;
			}
			await ctx.db.patch(args.userId, {
				streak: newStreak,
				lastActive: timestamp
			});
		}

		await ctx.db.insert('activityLogs', {
			userId: args.userId,
			action: 'Completed Batch',
			meta: `${args.subject}: ${args.score}/${args.total}`,
			timestamp
		});
	}
});
