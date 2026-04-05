/**
 * SchoolCBT — Payment Activation Convex mutations
 * Activates user subscriptions after verified payment
 */
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// ── Activate a subscription after successful payment ─────────────────────────
export const activateSubscription = mutation({
	args: {
		uid: v.string(), // Firebase UID
		plan: v.union(v.literal('student'), v.literal('tutor'), v.literal('institution')),
		paymentRef: v.string(),
		provider: v.string(),
		amountPaid: v.number(),
		examType: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		// 90-day expiry for premium, 180-day for institution
		const daysMap: Record<string, number> = {
			student: 90,
			tutor: 365,
			institution: 365
		};
		const days = daysMap[args.plan] ?? 90;
		const expiry = now + days * 86_400_000;

		// Find user by Firebase UID
		const user = await ctx.db
			.query('users')
			.withIndex('by_uid', (q) => q.eq('uid', args.uid))
			.first();

		if (!user) {
			throw new Error(`User not found for uid: ${args.uid}`);
		}

		await ctx.db.patch(user._id, {
			subscriptionPlan: args.plan,
			subscriptionStatus: 'active',
			subscriptionExpiry: expiry
		});

		// Audit log
		await ctx.db.insert('auditLogs', {
			action: 'subscription_activated',
			actorId: args.uid,
			targetId: user._id,
			changes: JSON.stringify({ plan: args.plan, ref: args.paymentRef, provider: args.provider, amount: args.amountPaid }),
			status: 'success',
			timestamp: now
		});

		return { activated: true, expiry, plan: args.plan };
	}
});

// ── Check subscription status ────────────────────────────────────────────────
export const getSubscriptionStatus = query({
	args: { uid: v.string() },
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query('users')
			.withIndex('by_uid', (q) => q.eq('uid', args.uid))
			.first();

		if (!user) return null;

		const now = Date.now();
		const isExpired = user.subscriptionExpiry ? user.subscriptionExpiry < now : false;

		return {
			plan: user.subscriptionPlan ?? 'free',
			status: isExpired ? 'expired' : (user.subscriptionStatus ?? 'inactive'),
			expiry: user.subscriptionExpiry,
			daysLeft: user.subscriptionExpiry
				? Math.max(0, Math.ceil((user.subscriptionExpiry - now) / 86_400_000))
				: 0
		};
	}
});
