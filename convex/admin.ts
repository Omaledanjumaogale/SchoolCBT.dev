import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

// Security constant for hardcoded super-admin verification
const ADMIN_SECRET = "tRx$uPerAdm!n$ecr3t2026#Ewin@project";

function requireAdmin(secret: string) {
  if (secret !== ADMIN_SECRET) {
    throw new Error("Unauthorized: Invalid Admin Secret");
  }
}

export const getSystemMetrics = query({
  args: { secret: v.string() },
  handler: async (ctx, args) => {
    requireAdmin(args.secret);
    
    const usersCount = (await ctx.db.query("users").collect()).length;
    const auditLogsCount = (await ctx.db.query("auditLogs").collect()).length;
    const rateLimitsCount = (await ctx.db.query("rateLimits").collect()).length;
    
    return {
      users: usersCount,
      activeSessions: rateLimitsCount, // Proxy for active elements
      totalAudits: auditLogsCount,
      timestamp: Date.now()
    };
  }
});

export const listUsers = query({
  args: { 
    secret: v.string(), 
    paginationOpts: paginationOptsValidator,
    searchTerm: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    requireAdmin(args.secret);
    // Simple exhaustive fetch for admin (In production with >1M we'd rely on search indexes)
    const q = ctx.db.query("users").order("desc");
    
    return await q.paginate(args.paginationOpts);
  }
});

export const getAuditLogs = query({
  args: { secret: v.string(), limit: v.number() },
  handler: async (ctx, args) => {
    requireAdmin(args.secret);
    return await ctx.db.query("auditLogs").order("desc").take(args.limit);
  }
});

export const suspendUser = mutation({
  args: { 
    secret: v.string(), 
    userId: v.id("users"), 
    status: v.union(
      v.literal('active'),
      v.literal('inactive'),
      v.literal('past_due'),
      v.literal('canceled')
    )
  },
  handler: async (ctx, args) => {
    requireAdmin(args.secret);
    await ctx.db.patch(args.userId, { subscriptionStatus: args.status });
    
    await ctx.db.insert("auditLogs", {
      action: "ADMIN_SUSPEND_USER",
      targetId: "users",
      status: "success",
      actorId: "SUPER_ADMIN",
      changes: JSON.stringify({ targetUser: args.userId, newStatus: args.status }),
      timestamp: Date.now()
    });
    
    return { success: true };
  }
});

export const clearSystemCache = mutation({
  args: { secret: v.string() },
  handler: async (ctx, args) => {
    requireAdmin(args.secret);
    const caches = await ctx.db.query("apiCache").collect();
    for (const c of caches) {
      await ctx.db.delete(c._id);
    }
    await ctx.db.insert("auditLogs", {
      action: "ADMIN_CLEAR_CACHE",
      targetId: "apiCache",
      status: "success",
      actorId: "SUPER_ADMIN",
      changes: "{}",
      timestamp: Date.now()
    });
    return { cleared: caches.length };
  }
});
