import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

/**
 * Ensures that the authenticated Firebase User is fully authorized to access
 * this specific SaaS Platform (SchoolCBT.dev).
 * Prevents crossover unauthorized access even if they exist in the global Firebase EWIN project.
 */
export const checkPlatformAccess = query({
	args: {},
	handler: async (ctx) => {
		// 1. Verify global identity (Firebase Token signature verified via Convex OIDC middleware)
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return {
				status: 'unauthenticated',
				reason: 'Invalid or missing Firebase Token',
				authorized: false
			};
		}

		// `identity.subject` maps to the Firebase UID
		const firebaseUid = identity.subject;

		// 2. Look up the user specifically in THIS platform's database
		const user = await ctx.db
			.query('users')
			.withIndex('by_uid', (q) => q.eq('uid', firebaseUid))
			.unique();

		if (!user) {
			// User exists in Global EWIN but has never onboarded or subscribed to this specific app.
			return {
				status: 'onboarding_required',
				uid: firebaseUid,
				userEmail: identity.email,
				authorized: false
			};
		}

		// 3. Verify platform specific authorization status
		if (user.subscriptionStatus === 'inactive' || user.subscriptionStatus === 'canceled') {
			return {
				status: 'unauthorized',
				reason: 'Subscription Inactive or Canceled',
				userId: user._id,
				authorized: false
			};
		}

		// 4. Access Granted to the platform
		return {
			status: 'authorized',
			userId: user._id,
			role: user.role,
			plan: user.subscriptionPlan,
			authorized: true
		};
	}
});
