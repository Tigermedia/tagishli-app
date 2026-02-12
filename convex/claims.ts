import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    userId: v.id("users"),
    conversationId: v.id("conversations"),
    claimType: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("claims", {
      userId: args.userId,
      conversationId: args.conversationId,
      claimType: args.claimType,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("claims")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { claimId: v.id("claims") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.claimId);
  },
});

export const updateDraft = mutation({
  args: {
    claimId: v.id("claims"),
    defendantName: v.optional(v.string()),
    defendantId: v.optional(v.string()),
    defendantAddress: v.optional(v.string()),
    claimAmount: v.optional(v.number()),
    description: v.optional(v.string()),
    legalDraft: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { claimId, ...updates } = args;
    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(claimId, { ...filtered, updatedAt: Date.now() });
  },
});

export const updateStatus = mutation({
  args: {
    claimId: v.id("claims"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.claimId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});
