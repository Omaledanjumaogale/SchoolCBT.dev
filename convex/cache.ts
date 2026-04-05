import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

/**
 * Distributed Query Caching Logic.
 * Safely writes/reads deduplicated payload results preventing heavy external DB requests.
 */
export const getCachedPayload = query({
	args: { cacheKey: v.string() },
	handler: async (ctx, args) => {
		const cached = await ctx.db
			.query('apiCache')
			.withIndex('by_key', (q) => q.eq('cacheKey', args.cacheKey))
			.unique();

		if (cached && cached.expiresAt > Date.now()) {
			return JSON.parse(cached.payload);
		}
		return null;
	}
});

export const setCachedPayload = mutation({
	args: {
		cacheKey: v.string(),
		payload: v.string(), // json stringified
		ttlMs: v.number()
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		const existing = await ctx.db
			.query('apiCache')
			.withIndex('by_key', (q) => q.eq('cacheKey', args.cacheKey))
			.unique();

		if (existing) {
			await ctx.db.patch(existing._id, {
				payload: args.payload,
				expiresAt: now + args.ttlMs
			});
		} else {
			await ctx.db.insert('apiCache', {
				cacheKey: args.cacheKey,
				payload: args.payload,
				expiresAt: now + args.ttlMs
			});
		}
	}
});

export const purgeExpiredCache = mutation({
	args: {},
	handler: async (ctx) => {
		const expired = await ctx.db
			.query('apiCache')
			.withIndex('by_expiresAt', (q) => q.lt('expiresAt', Date.now()))
			.take(100);

		for (const record of expired) {
			await ctx.db.delete(record._id);
		}
	}
});
