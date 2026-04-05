import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { z } from "zod";
import { customMutation } from "convex-helpers/server/customFunctions";

const triggerWrapper = customMutation(mutation, {
  args: {},
  input: async (ctx, args) => {
    return { ctx: { ...ctx }, args };
  },
});

export const simulateAuditTrigger = triggerWrapper({
  args: {
    action: v.string(),
    tableName: v.string(),
    payload: v.any(),
  },
  handler: async (ctx, args) => {
    // 1. Zero-Latency Lifecycle trigger emulate SQL row-level auditing
    // Hook automatically logs high-sensitivity modifications
    
    // In actual implementation it wraps the core action payload
    await ctx.db.insert("auditLogs", {
      action: args.action,
      targetId: args.tableName,
      status: "success",
      actorId: "system", // Normally ctx.auth...
      changes: JSON.stringify(args.payload),
      timestamp: Date.now()
    });

    return { triggered: true };
  }
});
