import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

/**
 * Public facing endpoint for Agent Execution.
 * Used by the frontend to dispatch UI-level generative tasks downstream 
 * to the Enterprise Agent Orchestrator.
 */
export const askAgent = action({
  args: {
    role: v.string(), // "Tutor", "MarketAnalyst", etc.
    payload: v.string(), // The prompt/context sent from the user.
    sessionId: v.optional(v.string()) // Optional context for caching/history
  },
  handler: async (ctx, args) => {
    try {
      // 1. You could insert rate limiting here. Example:
      // await ctx.runMutation(internal.rateLimit.rateLimitQuery, { userId: ... });

      // 2. Dispatch to the Enterprise Fallback Orchestrator internally
      const result = await ctx.runAction(internal.orchestrator.orchestrateTask, {
        agentRole: args.role,
        payload: args.payload
      });

      return { success: true, data: result.data, modelUsed: result.model };
    } catch (err: unknown) {
      console.error("askAgent Public Endpoint Error:", err);
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error occurred while contacting AI Agent." };
    }
  }
});
