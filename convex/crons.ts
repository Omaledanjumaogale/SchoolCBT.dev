/**
 * Cron Jobs — SchoolCBT Workflow Scheduler
 * Runs background jobs on a defined schedule synchronized with Convex backend.
 */
import { cronJobs } from 'convex/server';
import { api } from './_generated/api';

const crons = cronJobs();

// ── Daily streak maintenance — runs at 01:00 WAT (00:00 UTC) every day ────
crons.cron('daily-streak-maintenance', '0 0 * * *', api.workflows.runDailyMaintenance, {});

// ── Seed default workflows on startup (every 6 hours, idempotent) ─────────
crons.interval('seed-workflows', { hours: 6 }, api.workflows.seedWorkflows, {});

// ── Crawler Background Tasks ───────────────────────────────────────────────
// 48-hour cache cleanup (every hour)
crons.interval('clean-crawler-cache', { hours: 1 }, api.crawler.cleanExpiredCache, {});

// Retry pending or stalled jobs (every 5 minutes)
crons.interval('retry-crawler-jobs', { minutes: 5 }, api.crawler.retryPendingJobs, {});

// ── Enterprise System Garbage Collection ────────────────────────────────────

// 1. Clear expired rate limits safely every 15 minutes
crons.interval('clear-rate-limits', { minutes: 15 }, api.rateLimit.clearRateLimits, {});

// 2. Destroy decoupled UI sessions that have flatlined for over 7 days at 3:00am UTC
crons.cron(
	'cleanup-sessions',
	'0 3 * * *', // 3:00 AM UTC
	api.sessions.cleanupSessions,
	{}
);

// 3. Purge old distributed API cache blocks at 4:00am UTC
crons.cron(
	'purge-expired-api-cache',
	'0 4 * * *', // 4:00 AM UTC
	api.cache.purgeExpiredCache,
	{}
);

export default crons;
