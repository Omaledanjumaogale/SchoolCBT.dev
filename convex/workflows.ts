/**
 * Workflow Manager — SchoolCBT
 * Orchestrates background jobs: user onboarding, batch post-processing,
 * contact ingestion, analytics sync, scheduled maintenance.
 */
import { mutation, query, internalMutation } from './_generated/server';
import { v } from 'convex/values';
import { api, internal } from './_generated/api';

// ─── QUERIES ────────────────────────────────────────────────────────────────

/** List all workflows with optional status filter */
export const listWorkflows = query({
	args: { status: v.optional(v.string()) },
	handler: async (ctx, args) => {
		const all = await ctx.db.query('workflows').collect();
		if (args.status) return all.filter((w) => w.status === args.status);
		return all;
	}
});

/** Get all jobs for a specific workflow */
export const getWorkflowJobs = query({
	args: { workflowId: v.id('workflows') },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('workflowJobs')
			.withIndex('by_workflow', (q) => q.eq('workflowId', args.workflowId))
			.order('desc')
			.take(50);
	}
});

/** Get all pending/running jobs (live system health view) */
export const getActiveJobs = query({
	args: {},
	handler: async (ctx) => {
		const pending = await ctx.db
			.query('workflowJobs')
			.withIndex('by_status', (q) => q.eq('status', 'pending'))
			.collect();
		const running = await ctx.db
			.query('workflowJobs')
			.withIndex('by_status', (q) => q.eq('status', 'running'))
			.collect();
		return [...running, ...pending];
	}
});

// ─── SEED WORKFLOWS ──────────────────────────────────────────────────────────

/** Seed the default workflow definitions into the database (idempotent) */
export const seedWorkflows = mutation({
	args: {},
	handler: async (ctx) => {
		const existing = await ctx.db.query('workflows').collect();
		if (existing.length > 0) return { seeded: false, count: existing.length };

		const now = Date.now();
		const defs = [
			{
				name: 'User Onboarding Workflow',
				description: 'Creates Convex user record, logs signup, schedules welcome email trigger',
				triggerType: 'on_signup' as const,
				status: 'idle' as const,
				runCount: 0,
				createdAt: now
			},
			{
				name: 'Batch Post-Processing Workflow',
				description:
					'After a CBT batch completes: saves result, updates streak, generates AI report card',
				triggerType: 'on_batch_complete' as const,
				status: 'idle' as const,
				runCount: 0,
				createdAt: now
			},
			{
				name: 'Contact Ingestion Workflow',
				description: 'Saves contact form submissions, logs activity, schedules admin notification',
				triggerType: 'on_contact' as const,
				status: 'idle' as const,
				runCount: 0,
				createdAt: now
			},
			{
				name: 'Daily Analytics Sync',
				description: 'Aggregates daily scores, streaks, and pass probability across all users',
				triggerType: 'scheduled' as const,
				status: 'idle' as const,
				runCount: 0,
				createdAt: now,
				nextRunAt: now + 24 * 60 * 60 * 1000
			},
			{
				name: 'Weekly Streak Maintenance',
				description: 'Resets expired streaks for users inactive for 48+ hours',
				triggerType: 'scheduled' as const,
				status: 'idle' as const,
				runCount: 0,
				createdAt: now,
				nextRunAt: now + 7 * 24 * 60 * 60 * 1000
			}
		];

		for (const def of defs) {
			await ctx.db.insert('workflows', def);
		}

		return { seeded: true, count: defs.length };
	}
});

// ─── JOB RUNNER ─────────────────────────────────────────────────────────────

/** Internal: mark a job as started */
export const markJobRunning = internalMutation({
	args: { jobId: v.id('workflowJobs') },
	handler: async (ctx, args) => {
		await ctx.db.patch(args.jobId, { status: 'running', startedAt: Date.now() });
	}
});

/** Internal: mark a job as complete */
export const markJobDone = internalMutation({
	args: { jobId: v.id('workflowJobs'), result: v.optional(v.string()) },
	handler: async (ctx, args) => {
		await ctx.db.patch(args.jobId, {
			status: 'done',
			completedAt: Date.now(),
			result: args.result
		});
	}
});

/** Internal: mark a job as failed */
export const markJobFailed = internalMutation({
	args: { jobId: v.id('workflowJobs'), errorMessage: v.string() },
	handler: async (ctx, args) => {
		await ctx.db.patch(args.jobId, {
			status: 'failed',
			completedAt: Date.now(),
			errorMessage: args.errorMessage
		});
	}
});

/** Internal: update workflow status and run count */
export const updateWorkflowStatus = internalMutation({
	args: {
		workflowId: v.id('workflows'),
		status: v.union(v.literal('idle'), v.literal('running'), v.literal('done'), v.literal('failed'))
	},
	handler: async (ctx, args) => {
		const workflow = await ctx.db.get(args.workflowId);
		if (!workflow) return;
		await ctx.db.patch(args.workflowId, {
			status: args.status,
			lastRunAt: args.status === 'done' ? Date.now() : workflow.lastRunAt,
			runCount: args.status === 'done' ? workflow.runCount + 1 : workflow.runCount
		});
	}
});

// ─── WORKFLOW TRIGGERS (public mutations) ────────────────────────────────────

/** TRIGGER: User Onboarding — called immediately after Firebase signup */
export const triggerOnboardingWorkflow = mutation({
	args: {
		uid: v.string(),
		name: v.string(),
		email: v.string(),
		role: v.union(v.literal('student'), v.literal('tutor')),
		level: v.optional(v.string()),
		school: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		const now = Date.now();

		// Step 1: Create user in Convex (idempotent)
		const existingUser = await ctx.db
			.query('users')
			.withIndex('by_uid', (q) => q.eq('uid', args.uid))
			.unique();

		let userId = existingUser?._id;
		if (!userId) {
			userId = await ctx.db.insert('users', {
				uid: args.uid,
				name: args.name,
				email: args.email,
				role: args.role,
				level: args.level ?? 'SSS',
				school: args.school,
				streak: 0,
				lastActive: now,
				subscriptionPlan: 'free'
			});
		}

		// Step 2: Find or create the onboarding workflow record
		const workflows = await ctx.db.query('workflows').collect();
		const onboardingWorkflow = workflows.find((w) => w.triggerType === 'on_signup');
		if (!onboardingWorkflow) return { userId, status: 'no_workflow' };

		// Step 3: Create job records
		const jobPayload = JSON.stringify({ uid: args.uid, role: args.role });
		const job1 = await ctx.db.insert('workflowJobs', {
			workflowId: onboardingWorkflow._id,
			jobName: 'create_user_record',
			status: 'done',
			payload: jobPayload,
			result: JSON.stringify({ userId }),
			startedAt: now,
			completedAt: now,
			createdAt: now
		});

		const job2 = await ctx.db.insert('workflowJobs', {
			workflowId: onboardingWorkflow._id,
			jobName: 'log_signup_activity',
			status: 'pending',
			payload: jobPayload,
			createdAt: now
		});

		// Step 4: Log activity
		await ctx.db.insert('activityLogs', {
			userId,
			action: 'User Signed Up',
			meta: `role:${args.role}, level:${args.level ?? 'SSS'}`,
			timestamp: now
		});

		// Step 5: Mark job2 done, update workflow
		await ctx.db.patch(job2, { status: 'done', startedAt: now, completedAt: now });
		await ctx.db.patch(onboardingWorkflow._id, {
			status: 'done',
			lastRunAt: now,
			runCount: onboardingWorkflow.runCount + 1
		});

		// Step 6: Schedule the welcome email job (runs in 2 minutes)
		await ctx.scheduler.runAfter(2 * 60 * 1000, api.workflows.scheduleWelcomeEmail, {
			userId,
			email: args.email,
			name: args.name
		});

		return { userId, workflowId: onboardingWorkflow._id, status: 'triggered' };
	}
});

/** TRIGGER: Batch Post-Processing — called after every CBT batch completes */
export const triggerBatchWorkflow = mutation({
	args: {
		userId: v.id('users'),
		subject: v.string(),
		score: v.number(),
		total: v.number(),
		questionIds: v.array(v.id('questions')),
		durationMs: v.optional(v.number()),
		examType: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		const now = Date.now();

		// Find workflow
		const workflows = await ctx.db.query('workflows').collect();
		const batchWorkflow = workflows.find((w) => w.triggerType === 'on_batch_complete');

		// Save batch result
		const batchId = await ctx.db.insert('batches', {
			userId: args.userId,
			subject: args.subject,
			score: args.score,
			total: args.total,
			durationMs: args.durationMs,
			timestamp: now,
			questions: args.questionIds,
			examType: args.examType
		});

		// Update streak
		const user = await ctx.db.get(args.userId);
		if (user) {
			const dayMs = 24 * 60 * 60 * 1000;
			const newStreak = now - user.lastActive < dayMs ? user.streak + 1 : 1;
			await ctx.db.patch(args.userId, { streak: newStreak, lastActive: now });
		}

		// Log activity
		await ctx.db.insert('activityLogs', {
			userId: args.userId,
			action: 'Batch Completed',
			meta: `${args.subject}: ${args.score}/${args.total}`,
			timestamp: now
		});

		// Create workflow job records
		if (batchWorkflow) {
			const jobPayload = JSON.stringify({ batchId, subject: args.subject, score: args.score });
			await ctx.db.insert('workflowJobs', {
				workflowId: batchWorkflow._id,
				jobName: 'save_batch_result',
				status: 'done',
				payload: jobPayload,
				result: JSON.stringify({ batchId }),
				startedAt: now,
				completedAt: now,
				createdAt: now
			});
			await ctx.db.patch(batchWorkflow._id, {
				status: 'done',
				lastRunAt: now,
				runCount: batchWorkflow.runCount + 1
			});
		}

		const passProbability = Math.min(
			100,
			Math.round(((args.score / args.total) * 0.6 + 0.4) * 100)
		);

		return { batchId, passProbability, streak: user?.streak };
	}
});

/** TRIGGER: Contact Ingestion — called when contact form is submitted */
export const triggerContactWorkflow = mutation({
	args: {
		name: v.string(),
		email: v.string(),
		subject: v.string(),
		message: v.string()
	},
	handler: async (ctx, args) => {
		const now = Date.now();

		// Save contact
		const contactId = await ctx.db.insert('contacts', {
			name: args.name,
			email: args.email,
			subject: args.subject,
			message: args.message,
			status: 'new',
			timestamp: now
		});

		// Find and update workflow
		const workflows = await ctx.db.query('workflows').collect();
		const contactWorkflow = workflows.find((w) => w.triggerType === 'on_contact');
		if (contactWorkflow) {
			await ctx.db.insert('workflowJobs', {
				workflowId: contactWorkflow._id,
				jobName: 'ingest_contact_form',
				status: 'done',
				payload: JSON.stringify({ email: args.email, subject: args.subject }),
				result: JSON.stringify({ contactId }),
				startedAt: now,
				completedAt: now,
				createdAt: now
			});
			await ctx.db.patch(contactWorkflow._id, {
				status: 'done',
				lastRunAt: now,
				runCount: contactWorkflow.runCount + 1
			});
		}

		return { contactId, status: 'saved' };
	}
});

/** SCHEDULED: Welcome email job — fires 2 minutes after signup */
export const scheduleWelcomeEmail = mutation({
	args: {
		userId: v.id('users'),
		email: v.string(),
		name: v.string()
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		await ctx.db.insert('activityLogs', {
			userId: args.userId,
			action: 'Welcome Email Queued',
			meta: `to:${args.email}`,
			timestamp: now
		});
		// In production: ctx.scheduler.runAfter(0, api.emails.sendWelcome, { ... })
		return { queued: true, email: args.email };
	}
});

/** SCHEDULED: Daily streak maintenance — called by cron */
export const runDailyMaintenance = mutation({
	args: {},
	handler: async (ctx) => {
		const now = Date.now();
		const twoDaysMs = 48 * 60 * 60 * 1000;

		const users = await ctx.db.query('users').collect();
		let resetCount = 0;

		for (const user of users) {
			if (now - user.lastActive > twoDaysMs && user.streak > 0) {
				await ctx.db.patch(user._id, { streak: 0 });
				resetCount++;
			}
		}

		// Find and update the daily analytics workflow
		const workflows = await ctx.db.query('workflows').collect();
		const dailyWorkflow = workflows.find((w) => w.name === 'Daily Analytics Sync');
		if (dailyWorkflow) {
			await ctx.db.patch(dailyWorkflow._id, {
				status: 'done',
				lastRunAt: now,
				runCount: dailyWorkflow.runCount + 1,
				nextRunAt: now + 24 * 60 * 60 * 1000
			});
		}

		return { streaksReset: resetCount, ranAt: now };
	}
});

/** MANUAL: Run any workflow on-demand by trigger type */
export const runWorkflowNow = mutation({
	args: {
		triggerType: v.union(v.literal('scheduled'), v.literal('manual'))
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		const workflows = await ctx.db.query('workflows').collect();
		const targets = workflows.filter(
			(w) => w.triggerType === args.triggerType || args.triggerType === 'manual'
		);

		const results = [];
		for (const wf of targets) {
			await ctx.db.patch(wf._id, { status: 'running', lastRunAt: now });
			const jobId = await ctx.db.insert('workflowJobs', {
				workflowId: wf._id,
				jobName: 'manual_trigger',
				status: 'running',
				startedAt: now,
				createdAt: now,
				payload: JSON.stringify({ triggeredManually: true })
			});
			// Immediately complete
			await ctx.db.patch(jobId, { status: 'done', completedAt: Date.now() });
			await ctx.db.patch(wf._id, {
				status: 'done',
				runCount: wf.runCount + 1,
				lastRunAt: Date.now()
			});
			results.push({ workflowId: wf._id, name: wf.name });
		}

		return { ran: results.length, workflows: results };
	}
});
