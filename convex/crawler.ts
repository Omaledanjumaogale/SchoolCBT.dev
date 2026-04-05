import { action, internalMutation, mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { api, internal } from './_generated/api';

// ── CONSTANTS & CONFIGURATION ───────────────────────────────────────────────
const CACHE_TTL_MS = 48 * 60 * 60 * 1000; // 48 hours
const CRAWL4AI_RENDER_URL =
	process.env.CRAWL4AI_URL || 'https://crawl4ai-service.onrender.com/crawl';
const CRAWL4AI_API_KEY = process.env.CRAWL4AI_API_KEY || '';

// Utility to create a simple hash string for URLs
function hashUrl(url: string): string {
	// A robust environment might use a SHA256 crypto digest.
	// We'll use a fast hash for orchestration tracking:
	let hash = 0;
	for (let i = 0; i < url.length; i++) {
		hash = (hash << 5) - hash + url.charCodeAt(i);
		hash |= 0;
	}
	return `hash_${Math.abs(hash)}`;
}

// ── TENANT VALIDATION & RATE LIMITING ───────────────────────────────────────
async function validateTenantCore(ctx: any, apiKeyHash: string) {
	const tenant = await ctx.db
		.query('crawlerTenants')
		.withIndex('by_api_key', (q: any) => q.eq('apiKeyHash', apiKeyHash))
		.unique();

	if (!tenant || !tenant.isActive) {
		return { valid: false, error: 'Invalid or inactive tenant API key.', tenant: null };
	}

	const now = Date.now();

	// Rate reset check using Day offset
	if (now > tenant.resetAt) {
		await ctx.db.patch(tenant._id, {
			requestsUsed: 0,
			resetAt: now + 24 * 60 * 60 * 1000
		});
		tenant.requestsUsed = 0;
	}

	if (tenant.requestsUsed >= tenant.requestLimitPerDay) {
		await ctx.db.insert('crawlLogs', {
			tenantId: tenant._id,
			action: 'request',
			status: 'rate_limited',
			timestamp: now
		});
		return { valid: false, error: 'Daily rate limit exceeded for this tenant.', tenant: null };
	}

	// Immediately increment usage
	await ctx.db.patch(tenant._id, { requestsUsed: tenant.requestsUsed + 1 });
	return { valid: true, error: undefined, tenant };
}

// Internal mutation since it reads and patches tenant records (for actions to call securely)
export const validateAndTrackTenant = internalMutation({
	args: { apiKeyHash: v.string() },
	handler: async (ctx, args) => {
		return await validateTenantCore(ctx, args.apiKeyHash);
	}
});

export const upsertCacheSilent = internalMutation({
	args: {
		url: v.string(),
		content: v.string(),
		metadata: v.string()
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		const urlHash = hashUrl(args.url);
		const existingCache = await ctx.db
			.query('crawlCache')
			.withIndex('by_url_hash', (q) => q.eq('urlHash', urlHash))
			.unique();

		if (existingCache) {
			await ctx.db.patch(existingCache._id, {
				content: args.content,
				metadata: args.metadata,
				timestamp: now,
				expiresAt: now + CACHE_TTL_MS
			});
		} else {
			await ctx.db.insert('crawlCache', {
				urlHash,
				url: args.url,
				content: args.content,
				metadata: args.metadata,
				timestamp: now,
				expiresAt: now + CACHE_TTL_MS
			});
		}
	}
});

// ── TENANT SEEDER / INITIALIZER ──────────────────────────────────────────────
export const seedCrawlerTenant = mutation({
	args: {
		platformName: v.string(),
		apiKeyPlain: v.string(),
		requestLimitPerDay: v.number()
	},
	handler: async (ctx, args) => {
		// In production we would hash this apiKeyPlain
		const apiKeyHash = hashUrl(args.apiKeyPlain); // Reusing hash utility for simplicity

		await ctx.db.insert('crawlerTenants', {
			platformName: args.platformName,
			apiKeyHash: apiKeyHash,
			requestLimitPerDay: args.requestLimitPerDay,
			requestsUsed: 0,
			resetAt: Date.now() + 24 * 60 * 60 * 1000,
			isActive: true
		});
		return { status: 'created', platform: args.platformName };
	}
});

// ── CACHE MANAGER ──────────────────────────────────────────────────────────
export const checkCache = query({
	args: { url: v.string() },
	handler: async (ctx, args) => {
		const urlHash = hashUrl(args.url);
		const cached = await ctx.db
			.query('crawlCache')
			.withIndex('by_url_hash', (q) => q.eq('urlHash', urlHash))
			.unique();

		if (cached && cached.expiresAt > Date.now()) {
			return cached;
		}
		return null;
	}
});

// ── THE ORCHESTRATOR ───────────────────────────────────────────────────────
// Mutation: Triggered by End-User Platform or AI Agent
export const requestCrawl = mutation({
	args: {
		apiKeyHash: v.string(),
		url: v.string(),
		priority: v.optional(v.number()),
		forceFresh: v.optional(v.boolean()) // Bypass cache optionally
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		const tenantResponse = await validateTenantCore(ctx, args.apiKeyHash);

		if (!tenantResponse.valid || !tenantResponse.tenant) {
			throw new Error(tenantResponse.error || 'Validation failed');
		}
		const tenant = tenantResponse.tenant;

		const urlHash = hashUrl(args.url);

		// 1. Check Cache
		if (!args.forceFresh) {
			const cached = await ctx.db
				.query('crawlCache')
				.withIndex('by_url_hash', (q) => q.eq('urlHash', urlHash))
				.unique();

			if (cached && cached.expiresAt > now) {
				await ctx.db.insert('crawlLogs', {
					tenantId: tenant._id,
					action: 'crawl',
					url: args.url,
					status: 'cached',
					timestamp: now
				});

				// Still increment tenant request tracking (cost of API)
				await ctx.db.patch(tenant._id, { requestsUsed: tenant.requestsUsed + 1 });
				return { status: 'cached', dataId: cached._id, content: cached.content };
			}
		}

		// 2. Insert into Queue
		const jobId = await ctx.db.insert('crawlJobs', {
			tenantId: tenant._id,
			url: args.url,
			status: 'pending',
			retries: 0,
			priority: args.priority ?? 10,
			createdAt: now,
			updatedAt: now
		});

		// Track tenant request usage
		await ctx.db.patch(tenant._id, { requestsUsed: tenant.requestsUsed + 1 });

		// 3. Kick off immediate background Action to process queue
		// We run it as an action so it handles the HTTP Request asynchronously
		await ctx.scheduler.runAfter(0, api.crawler.executeCrawlJob as any, {
			jobId,
			url: args.url,
			tenantId: tenant._id
		});

		return { status: 'queued', jobId };
	}
});

// ── BACKGROUND WORKER (EXTERNAL MICROSERVICE COMMUNICATION) ────────────────
export const executeCrawlJob = action({
	args: {
		jobId: v.id('crawlJobs'),
		url: v.string(),
		tenantId: v.id('crawlerTenants')
	},
	handler: async (ctx, args) => {
		const startTime = Date.now();

		try {
			// Step 1: Tell convex we are running
			await ctx.runMutation(internal.crawler.updateJobStatus, {
				jobId: args.jobId,
				status: 'running'
			});

			// Step 2: Hit Render Service (Crawl4AI)
			const response = await fetch(CRAWL4AI_RENDER_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${CRAWL4AI_API_KEY}`
				},
				body: JSON.stringify({ url: args.url })
			});

			if (!response.ok) {
				// Could be 502/503 from Render cold start
				const errText = await response.text();
				throw new Error(`Crawl4AI Error: ${response.status} - ${errText}`);
			}

			const rawData = await response.json();
			// Assume payload has { text: "...", metadata: {...} }

			const content = rawData.text || rawData.content || JSON.stringify(rawData);
			const metadata = rawData.metadata ? JSON.stringify(rawData.metadata) : JSON.stringify({});

			// Step 3: Save to cache and complete job
			const duration = Date.now() - startTime;
			await ctx.runMutation(internal.crawler.completeCrawlJob, {
				jobId: args.jobId,
				tenantId: args.tenantId,
				url: args.url,
				content: content,
				metadata: metadata,
				durationMs: duration
			});
		} catch (error: any) {
			const duration = Date.now() - startTime;

			await ctx.runMutation(internal.crawler.failCrawlJob, {
				jobId: args.jobId,
				tenantId: args.tenantId,
				url: args.url,
				durationMs: duration,
				errorMsg: error.message
			});
		}
	}
});

// ── AI ORCHESTRATION LAYER ──────────────────────────────────────────────────
// This action is called directly by other AI Agents to fetch web data intelligently.
// It checks the cache first (saving external compute), otherwise dynamically
// requests Crawl4AI to fetch, parse, and save it.
export const aiOrchestrateCrawl = action({
	args: {
		apiKeyHash: v.string(),
		url: v.string(),
		forceRefresh: v.optional(v.boolean())
	},
	handler: async (ctx, args) => {
		// 1. Initial Tenant Validation & Rate limit decrement
		const tenantResp: { valid: boolean; error?: string; tenant?: any } = await ctx.runMutation(
			internal.crawler.validateAndTrackTenant as any,
			{
				apiKeyHash: args.apiKeyHash
			}
		);

		if (!tenantResp.valid) throw new Error(tenantResp.error);

		// 2. Check Cache First (if not forced)
		if (!args.forceRefresh) {
			const cachedData: any = await ctx.runQuery(api.crawler.checkCache as any, { url: args.url });
			if (cachedData) {
				return {
					source: 'cache',
					url: cachedData.url,
					content: cachedData.content,
					metadata: cachedData.metadata ? JSON.parse(cachedData.metadata) : {},
					cachedAgeMs: Date.now() - cachedData.timestamp
				};
			}
		}

		// 3. Fallback: Wake Render and Wait for Live Crawl (AI Agents need synchronous results)
		try {
			// Background wake ping (non-blocking)
			ctx.runAction(api.crawler.wakeRenderService as any, {}).catch(() => {});

			const response = await fetch(CRAWL4AI_RENDER_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${CRAWL4AI_API_KEY}`
				},
				body: JSON.stringify({ url: args.url })
			});

			if (!response.ok) throw new Error('Crawl4AI API Failed');

			const rawData = await response.json();
			const content = rawData.text || rawData.content || JSON.stringify(rawData);
			const metadata = rawData.metadata ? JSON.stringify(rawData.metadata) : '{}';

			// 4. Save to cache asynchronously so we don't block the AI return
			ctx
				.runMutation(internal.crawler.upsertCacheSilent as any, {
					url: args.url,
					content: content,
					metadata: metadata
				})
				.catch(() => {});

			return {
				source: 'live',
				url: args.url,
				content: content,
				metadata: JSON.parse(metadata)
			};
		} catch (e: any) {
			// If live crawl fails, AI agent can gracefully degrade or throw
			throw new Error(`AI Orchestration Crawl Failed: ${e.message}`);
		}
	}
});

// ── INTERNAL MUTATIONS FOR ACTIONS ──────────────────────────────────────────

export const updateJobStatus = internalMutation({
	args: {
		jobId: v.id('crawlJobs'),
		status: v.union(v.literal('running'), v.literal('pending'))
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.jobId, { status: args.status, updatedAt: Date.now() });
	}
});

export const completeCrawlJob = internalMutation({
	args: {
		jobId: v.id('crawlJobs'),
		tenantId: v.id('crawlerTenants'),
		url: v.string(),
		content: v.string(),
		metadata: v.string(),
		durationMs: v.number()
	},
	handler: async (ctx, args) => {
		const now = Date.now();

		// Save to cache (48 hour TTL)
		const urlHash = hashUrl(args.url);
		const existingCache = await ctx.db
			.query('crawlCache')
			.withIndex('by_url_hash', (q) => q.eq('urlHash', urlHash))
			.unique();

		let cacheId;
		if (existingCache) {
			cacheId = existingCache._id;
			await ctx.db.patch(existingCache._id, {
				content: args.content,
				metadata: args.metadata,
				timestamp: now,
				expiresAt: now + CACHE_TTL_MS
			});
		} else {
			cacheId = await ctx.db.insert('crawlCache', {
				urlHash,
				url: args.url,
				content: args.content,
				metadata: args.metadata,
				timestamp: now,
				expiresAt: now + CACHE_TTL_MS
			});
		}

		// Mark job completed
		await ctx.db.patch(args.jobId, {
			status: 'completed',
			resultId: cacheId,
			updatedAt: now
		});

		// Log success
		await ctx.db.insert('crawlLogs', {
			tenantId: args.tenantId,
			action: 'crawl',
			url: args.url,
			responseTimeMs: args.durationMs,
			status: 'success',
			timestamp: now
		});
	}
});

export const failCrawlJob = internalMutation({
	args: {
		jobId: v.id('crawlJobs'),
		tenantId: v.id('crawlerTenants'),
		url: v.string(),
		durationMs: v.number(),
		errorMsg: v.string()
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		const job = await ctx.db.get(args.jobId);

		if (!job) return;

		if (job.retries < 3) {
			// Put back in pending to be picked up by Cron retry
			await ctx.db.patch(args.jobId, {
				status: 'pending',
				retries: job.retries + 1,
				error: args.errorMsg,
				updatedAt: now
			});
		} else {
			// Mark permanently failed
			await ctx.db.patch(args.jobId, {
				status: 'failed',
				error: args.errorMsg,
				updatedAt: now
			});
		}

		// Log failure
		await ctx.db.insert('crawlLogs', {
			tenantId: args.tenantId,
			action: 'crawl',
			url: args.url,
			responseTimeMs: args.durationMs,
			status: 'failed',
			meta: JSON.stringify({ error: args.errorMsg }),
			timestamp: now
		});
	}
});

// ── WAKE RENDER SERVICE (Cold Starts) ──────────────────────────────────────
export const wakeRenderService = action({
	args: {},
	handler: async () => {
		// Ping Render base URL to wake up the service
		// Does not wait for extensive parsing, just triggers container spin-up
		try {
			const baseApi = CRAWL4AI_RENDER_URL.replace('/crawl', '');
			await fetch(baseApi, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
		} catch {
			// Ignore abort/timeout, the ping itself wakes the server
		}
	}
});

// ── CRON SCHEDULER HANDLERS ──────────────────────────────────────────────────

export const cleanExpiredCache = mutation({
	args: {},
	handler: async (ctx) => {
		const expiredRecords = await ctx.db
			.query('crawlCache')
			.withIndex('by_expiresAt', (q) => q.lt('expiresAt', Date.now()))
			.take(100);

		for (const record of expiredRecords) {
			await ctx.db.delete(record._id);
		}
	}
});

export const retryPendingJobs = mutation({
	args: {},
	handler: async (ctx) => {
		const now = Date.now();
		// Jobs that have been pending/running for over 5 minutes
		const staleTime = now - 5 * 60 * 1000;

		// Find pending jobs
		const pending = await ctx.db
			.query('crawlJobs')
			.withIndex('by_status', (q) => q.eq('status', 'pending'))
			.take(10);

		// Find stalled 'running' jobs
		const running = await ctx.db
			.query('crawlJobs')
			.withIndex('by_status', (q) => q.eq('status', 'running'))
			.filter((q) => q.lt(q.field('updatedAt'), staleTime))
			.take(10);

		const jobsToRetry = [...pending, ...running];

		for (const job of jobsToRetry) {
			// Re-trigger the background action if retries allow
			if (job.retries < 3) {
				await ctx.scheduler.runAfter(0, api.crawler.executeCrawlJob as any, {
					jobId: job._id,
					url: job.url,
					tenantId: job.tenantId
				});
			} else {
				await ctx.db.patch(job._id, { status: 'failed', error: 'Max retries exceeded' });
			}
		}
	}
});
