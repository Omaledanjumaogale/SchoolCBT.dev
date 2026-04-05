import { mutation } from './_generated/server';
import { v } from 'convex/values';

// 7 days expiration for decoupled UI sessions
const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

// 5 minutes heartbeat debounce
const DEBOUNCE_MS = 5 * 60 * 1000;

/**
 * Validates the client-side sessionId, updates heartbeat timers, explicitly
 * binds current firebaseUid identities once authenticated, and records the ipAddress or userAgent.
 */
export const sessionTrackingMutation = mutation({
	args: {
		sessionId: v.string(),
		firebaseUid: v.optional(v.string()),
		ipAddress: v.optional(v.string()),
		userAgent: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		const now = Date.now();

		// First, verify user resolution if logged in via firebase
		let userId;
		if (args.firebaseUid) {
			const user = await ctx.db
				.query('users')
				.withIndex('by_uid', (q) => q.eq('uid', args.firebaseUid as string))
				.unique();
			if (user) userId = user._id;
		}

		const existingSession = await ctx.db
			.query('sessions')
			.withIndex('by_session', (q) => q.eq('sessionId', args.sessionId))
			.unique();

		if (existingSession) {
			// Debounce logic: only patch if > 5 mins passed or identity linked up newly
			if (
				now - existingSession.lastHeartbeat > DEBOUNCE_MS ||
				(!existingSession.userId && userId)
			) {
				await ctx.db.patch(existingSession._id, {
					lastHeartbeat: now,
					userId: userId ?? existingSession.userId,
					firebaseUid: args.firebaseUid ?? existingSession.firebaseUid
				});
			}
			return { valid: true };
		}

		await ctx.db.insert('sessions', {
			sessionId: args.sessionId,
			userId: userId,
			firebaseUid: args.firebaseUid,
			ipAddress: args.ipAddress,
			userAgent: args.userAgent,
			lastHeartbeat: now,
			createdAt: now
		});

		return { valid: true, newSession: true };
	}
});

/**
 * Destroy decoupled UI sessions that have flatlined for over 7 days.
 */
export const cleanupSessions = mutation({
	args: {},
	handler: async (ctx) => {
		const expiredTime = Date.now() - SESSION_EXPIRY_MS;

		const expired = await ctx.db
			.query('sessions')
			.withIndex('by_heartbeat', (q) => q.lt('lastHeartbeat', expiredTime))
			.take(100);

		for (const record of expired) {
			await ctx.db.delete(record._id);
		}
	}
});
