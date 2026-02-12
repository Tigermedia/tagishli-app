import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    phone: v.string(),
    fullName: v.string(),
    email: v.optional(v.string()),
    idNumber: v.optional(v.string()),
    address: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_phone", ["phone"]),

  conversations: defineTable({
    userId: v.id("users"),
    claimId: v.optional(v.id("claims")),
    status: v.string(), // "active" | "completed" | "abandoned"
    claimType: v.optional(v.string()), // "spam" | "small_claim" | "vehicle" | "defense"
    collectedData: v.optional(v.any()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    role: v.string(), // "user" | "assistant" | "system"
    content: v.string(),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_conversation", ["conversationId"]),

  claims: defineTable({
    userId: v.id("users"),
    conversationId: v.id("conversations"),
    claimType: v.string(),
    status: v.string(), // "draft" | "review" | "submitted" | "in_progress" | "closed"
    defendantName: v.optional(v.string()),
    defendantId: v.optional(v.string()),
    defendantAddress: v.optional(v.string()),
    claimAmount: v.optional(v.number()),
    description: v.optional(v.string()),
    legalDraft: v.optional(v.string()),
    pdfStorageId: v.optional(v.id("_storage")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_conversation", ["conversationId"]),

  documents: defineTable({
    claimId: v.id("claims"),
    userId: v.id("users"),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
    storageId: v.id("_storage"),
    createdAt: v.number(),
  }).index("by_claim", ["claimId"]),

  payments: defineTable({
    claimId: v.id("claims"),
    userId: v.id("users"),
    amount: v.number(),
    currency: v.string(),
    status: v.string(), // "pending" | "completed" | "failed"
    transactionId: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_claim", ["claimId"])
    .index("by_user", ["userId"]),
});
