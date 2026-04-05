import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { internal } from './_generated/api';

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1-minute window
const MAX_REQUESTS = 50;

/**
 * Highly optimized rateLimitQuery to read token buckets without expensive writes.
 */
export const rateLimitQuery = query({
	args: { key: v.string() },
	handler: async (ctx, args) => {
		const existing = await ctx.db
			.query('rateLimits')
			.withIndex('by_key', (q) => q.eq('key', args.key))
			.unique();

		if (!existing) return { allowed: true, cached: false };

		const limit = MAX_REQUESTS;
		const now = Date.now();
		const windowStart = now - RATE_LIMIT_WINDOW_MS;

		if (existing.lastRefill < windowStart) return { allowed: true, cached: true };
		if (existing.tokens >= limit)
			return { allowed: false, retryAfter: existing.lastRefill + RATE_LIMIT_WINDOW_MS - now };

		return { allowed: true, cached: true };
	}
});

/**
 * Token-bucket or fixed-window rate limiter mutation check.
 */
export const checkRateLimit = mutation({
	args: { key: v.string(), limit: v.optional(v.number()) },
	handler: async (ctx, args) => {
		const limit = args.limit || MAX_REQUESTS;
		const now = Date.now();
		const windowStart = now - RATE_LIMIT_WINDOW_MS;

		const existing = await ctx.db
			.query('rateLimits')
			.withIndex('by_key', (q) => q.eq('key', args.key))
			.unique();

		if (existing) {
			if (existing.lastRefill < windowStart) {
				// Reset window
				await ctx.db.patch(existing._id, { tokens: 1, lastRefill: now });
				return { allowed: true };
			}

			if (existing.tokens >= limit) {
				return { allowed: false, retryAfter: existing.lastRefill + RATE_LIMIT_WINDOW_MS - now };
			}

			await ctx.db.patch(existing._id, { tokens: existing.tokens + 1 });
			return { allowed: true };
		}

		// New limit key
		await ctx.db.insert('rateLimits', {
			key: args.key,
			tokens: 1,
			lastRefill: now
		});

		return { allowed: true };
	}
});

export const clearRateLimits = mutation({
	args: {},
	handler: async (ctx) => {
		const expiredTime = Date.now() - RATE_LIMIT_WINDOW_MS;

		// We fetch a batch to prevent slow queries on huge sweeps
		const expired = await ctx.db
			.query('rateLimits')
			.filter((q) => q.lt(q.field('lastRefill'), expiredTime))
			.take(100);

		for (const record of expired) {
			await ctx.db.delete(record._id);
		}
	}
});
