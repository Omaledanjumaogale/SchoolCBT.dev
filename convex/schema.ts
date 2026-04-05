import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	// ── Core user profiles ──────────────────────────────────────────────────
	users: defineTable({
		name: v.string(),
		email: v.string(),
		uid: v.string(), // Firebase UID
		role: v.optional(v.union(v.literal('student'), v.literal('tutor'), v.literal('admin'))),
		level: v.string(),
		school: v.optional(v.string()),
		streak: v.number(),
		lastActive: v.number(),
		subscriptionPlan: v.optional(
			v.union(v.literal('free'), v.literal('student'), v.literal('tutor'), v.literal('institution'))
		),
		subscriptionStatus: v.optional(
			v.union(
				v.literal('active'),
				v.literal('inactive'),
				v.literal('past_due'),
				v.literal('canceled')
			)
		),
		subscriptionExpiry: v.optional(v.number())
	})
		.index('by_uid', ['uid'])
		.index('by_email', ['email']),

	// ── Question bank ────────────────────────────────────────────────────────
	questions: defineTable({
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
		.index('by_subject', ['subject'])
		.index('by_level', ['level'])
		.index('by_exam', ['exam']),

	// ── CBT session batches ───────────────────────────────────────────────────
	batches: defineTable({
		userId: v.id('users'),
		subject: v.string(),
		score: v.number(),
		total: v.number(),
		durationMs: v.optional(v.number()),
		timestamp: v.number(),
		questions: v.array(v.id('questions')),
		examType: v.optional(v.string())
	})
		.index('by_user', ['userId'])
		.index('by_user_subject', ['userId', 'subject']),

	// ── Activity / audit logs ─────────────────────────────────────────────────
	activityLogs: defineTable({
		userId: v.id('users'),
		action: v.string(),
		meta: v.optional(v.string()),
		timestamp: v.number()
	}).index('by_user', ['userId']),

	// ── Contact form submissions ──────────────────────────────────────────────
	contacts: defineTable({
		name: v.string(),
		email: v.string(),
		subject: v.string(),
		message: v.string(),
		status: v.union(v.literal('new'), v.literal('replied'), v.literal('closed')),
		timestamp: v.number()
	}).index('by_status', ['status']),

	// ── Tutor profiles ────────────────────────────────────────────────────────
	tutors: defineTable({
		userId: v.id('users'),
		subjects: v.array(v.string()),
		bio: v.optional(v.string()),
		ratePerHour: v.number(),
		rating: v.optional(v.number()),
		totalSessions: v.number(),
		totalEarnings: v.number(),
		verified: v.boolean()
	}).index('by_user', ['userId']),

	// ── Workflow orchestration ────────────────────────────────────────────────
	workflows: defineTable({
		name: v.string(),
		description: v.optional(v.string()),
		triggerType: v.union(
			v.literal('manual'),
			v.literal('on_signup'),
			v.literal('on_batch_complete'),
			v.literal('on_contact'),
			v.literal('scheduled')
		),
		status: v.union(
			v.literal('idle'),
			v.literal('running'),
			v.literal('done'),
			v.literal('failed')
		),
		lastRunAt: v.optional(v.number()),
		nextRunAt: v.optional(v.number()),
		runCount: v.number(),
		createdAt: v.number()
	}).index('by_trigger', ['triggerType']),

	// ── Individual workflow job executions ────────────────────────────────────
	workflowJobs: defineTable({
		workflowId: v.id('workflows'),
		jobName: v.string(),
		status: v.union(
			v.literal('pending'),
			v.literal('running'),
			v.literal('done'),
			v.literal('failed')
		),
		payload: v.optional(v.string()), // JSON string of input args
		result: v.optional(v.string()), // JSON string of output
		errorMessage: v.optional(v.string()),
		startedAt: v.optional(v.number()),
		completedAt: v.optional(v.number()),
		createdAt: v.number()
	})
		.index('by_workflow', ['workflowId'])
		.index('by_status', ['status']),

	// ── Tutor sessions ────────────────────────────────────────────────────────
	tutorSessions: defineTable({
		tutorId: v.id('tutors'),
		studentId: v.id('users'),
		subject: v.string(),
		scheduledAt: v.number(),
		durationMinutes: v.number(),
		status: v.union(v.literal('booked'), v.literal('completed'), v.literal('cancelled')),
		notes: v.optional(v.string()),
		amount: v.number()
	})
		.index('by_tutor', ['tutorId'])
		.index('by_student', ['studentId']),

	// ── MULTI-TENANCY & CRAWLER INFRASTRUCTURE ──────────────────────────────────

	// Defines API clients using the crawler
	crawlerTenants: defineTable({
		apiKeyHash: v.string(),
		platformName: v.string(),
		requestLimitPerDay: v.number(),
		requestsUsed: v.number(),
		resetAt: v.number(),
		isActive: v.boolean()
	}).index('by_api_key', ['apiKeyHash']),

	// Caching layer (48 hours TTL)
	crawlCache: defineTable({
		urlHash: v.string(),
		url: v.string(),
		content: v.string(), // Markdown or raw payload extracted by Crawl4AI
		metadata: v.optional(v.string()), // JSON string of extraction metadata
		timestamp: v.number(),
		expiresAt: v.number()
	})
		.index('by_url_hash', ['urlHash'])
		.index('by_expiresAt', ['expiresAt']),

	// Crawl jobs queue
	crawlJobs: defineTable({
		tenantId: v.id('crawlerTenants'),
		url: v.string(),
		status: v.union(
			v.literal('pending'),
			v.literal('running'),
			v.literal('completed'),
			v.literal('failed')
		),
		resultId: v.optional(v.id('crawlCache')),
		error: v.optional(v.string()),
		retries: v.number(),
		priority: v.number(),
		createdAt: v.number(),
		updatedAt: v.number()
	})
		.index('by_status', ['status'])
		.index('by_tenant', ['tenantId']),

	// Centralized crawl logging
	crawlLogs: defineTable({
		tenantId: v.id('crawlerTenants'),
		action: v.string(),
		url: v.optional(v.string()),
		responseTimeMs: v.optional(v.number()),
		status: v.union(
			v.literal('success'),
			v.literal('failed'),
			v.literal('rate_limited'),
			v.literal('cached')
		),
		meta: v.optional(v.string()),
		timestamp: v.number()
	}).index('by_tenant', ['tenantId']),

	// ── ENTERPRISE ADVANCED INFRASTRUCTURE ─────────────────────────────────────

	// 1. Advanced Rate Limiting
	rateLimits: defineTable({
		key: v.string(), // e.g. "mutationName:userId" or IP
		tokens: v.number(),
		lastRefill: v.number()
	}).index('by_key', ['key']),

	// 2. Client-Linked Session Tracking
	sessions: defineTable({
		sessionId: v.string(),
		userId: v.optional(v.id('users')), // Resolves once logged in
		firebaseUid: v.optional(v.string()), // Tracks the global auth key bound
		ipAddress: v.optional(v.string()),
		userAgent: v.optional(v.string()),
		lastHeartbeat: v.number(),
		createdAt: v.number()
	})
		.index('by_session', ['sessionId'])
		.index('by_user', ['userId'])
		.index('by_heartbeat', ['lastHeartbeat']),

	// 3. Distributed Query API Caching
	apiCache: defineTable({
		cacheKey: v.string(),
		payload: v.string(), // Stringified JSON responses
		expiresAt: v.number() // TTL binding
	})
		.index('by_key', ['cacheKey'])
		.index('by_expiresAt', ['expiresAt']),

	// 4. Centralized System Audit Triggers
	auditLogs: defineTable({
		action: v.string(),
		actorId: v.optional(v.string()),
		targetId: v.optional(v.string()),
		changes: v.optional(v.string()),
		status: v.union(v.literal('success'), v.literal('error')),
		errorMessage: v.optional(v.string()),
		timestamp: v.number()
	})
		.index('by_actor', ['actorId'])
		.index('by_action', ['action'])
});
