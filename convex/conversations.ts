import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("conversations", {
      userId: args.userId,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.conversationId);
  },
});

export const updateClaimType = mutation({
  args: {
    conversationId: v.id("conversations"),
    claimType: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.conversationId, {
      claimType: args.claimType,
      updatedAt: Date.now(),
    });
  },
});

export const updateCollectedData = mutation({
  args: {
    conversationId: v.id("conversations"),
    collectedData: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.conversationId, {
      collectedData: args.collectedData,
      updatedAt: Date.now(),
    });
  },
});

export const complete = mutation({
  args: {
    conversationId: v.id("conversations"),
    claimId: v.id("claims"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.conversationId, {
      status: "completed",
      claimId: args.claimId,
      updatedAt: Date.now(),
    });
  },
});
