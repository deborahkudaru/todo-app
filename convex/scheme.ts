import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    order: v.number(),
    createdAt: v.number(),
  })
    .index("by_order", ["order"])
    .index("by_creation_time", ["createdAt"]),
});