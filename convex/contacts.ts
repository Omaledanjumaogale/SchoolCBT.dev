/**
 * Contact mutations & queries — SchoolCBT
 */
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// ── Save a contact form submission ────────────────────────────────────────
export const submitContact = mutation({
	args: {
		name: v.string(),
		email: v.string(),
		subject: v.string(),
		message: v.string()
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		// Prevent rapid duplicate submissions (same email within 60s)
		const recent = await ctx.db.query('contacts').collect();
		const duplicate = recent.find((c) => c.email === args.email && now - c.timestamp < 60_000);
		if (duplicate) return { contactId: duplicate._id, duplicate: true };

		const contactId = await ctx.db.insert('contacts', {
			name: args.name,
			email: args.email,
			subject: args.subject,
			message: args.message,
			status: 'new',
			timestamp: now
		});

		return { contactId, duplicate: false };
	}
});

// ── List contacts (admin) ─────────────────────────────────────────────────
export const listContacts = query({
	args: { status: v.optional(v.string()) },
	handler: async (ctx, args) => {
		const all = await ctx.db.query('contacts').order('desc').take(100);
		if (args.status) return all.filter((c) => c.status === args.status);
		return all;
	}
});

// ── Update contact status ─────────────────────────────────────────────────
export const updateContactStatus = mutation({
	args: {
		contactId: v.id('contacts'),
		status: v.union(v.literal('new'), v.literal('replied'), v.literal('closed'))
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.contactId, { status: args.status });
		return { updated: true };
	}
});
