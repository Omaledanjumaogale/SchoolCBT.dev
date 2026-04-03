import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    uid: v.string(), // Firebase UID
    level: v.string(),
    school: v.optional(v.string()),
    streak: v.number(),
    lastActive: v.number(),
  }).index("by_uid", ["uid"]),

  questions: defineTable({
    text: v.string(),
    options: v.array(v.object({
      letter: v.string(),
      text: v.string(),
    })),
    correct: v.string(),
    explanation: v.string(),
    subject: v.string(),
    level: v.string(),
    exam: v.string(),
    bloom: v.string(),
  }).index("by_subject", ["subject"])
    .index("by_level", ["level"]),

  batches: defineTable({
    userId: v.id("users"),
    subject: v.string(),
    score: v.number(),
    total: v.number(),
    timestamp: v.number(),
    questions: v.array(v.id("questions")),
  }).index("by_user", ["userId"]),

  activityLogs: defineTable({
    userId: v.id("users"),
    action: v.string(),
    meta: v.optional(v.string()),
    timestamp: v.number(),
  }).index("by_user", ["userId"]),
});
