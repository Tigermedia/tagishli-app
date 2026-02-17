import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save or update a chat session log
export const upsert = mutation({
  args: {
    sessionId: v.string(),
    messages: v.array(v.object({ role: v.string(), content: v.string(), timestamp: v.number() })),
    userEmail: v.optional(v.string()),
    claimType: v.optional(v.string()),
    converted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("chatLogs")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        messages: args.messages,
        ...(args.userEmail && { userEmail: args.userEmail }),
        ...(args.claimType && { claimType: args.claimType }),
        ...(args.converted !== undefined && { converted: args.converted }),
        updatedAt: Date.now(),
      });
      return existing._id;
    } else {
      return await ctx.db.insert("chatLogs", {
        sessionId: args.sessionId,
        messages: args.messages,
        userEmail: args.userEmail,
        claimType: args.claimType,
        converted: args.converted ?? false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// List all chat logs (newest first), with pagination
export const list = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    return await ctx.db
      .query("chatLogs")
      .withIndex("by_created")
      .order("desc")
      .take(limit);
  },
});

// Get a single chat log by sessionId
export const getBySession = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("chatLogs")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();
  },
});

// Export chat as text format
export const exportAsText = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const log = await ctx.db
      .query("chatLogs")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .first();

    if (!log) return null;

    const header = `=== שיחה ${log.sessionId} ===\nתאריך: ${new Date(log.createdAt).toLocaleString("he-IL")}\nאימייל: ${log.userEmail || "לא זוהה"}\nסוג תביעה: ${log.claimType || "לא זוהה"}\nהומרה: ${log.converted ? "כן" : "לא"}\n${"=".repeat(40)}\n`;

    const body = log.messages
      .map((m) => {
        const time = new Date(m.timestamp).toLocaleTimeString("he-IL");
        const sender = m.role === "user" ? "👤 משתמש" : "🤖 עוזר";
        return `[${time}] ${sender}:\n${m.content}\n`;
      })
      .join("\n");

    return header + body;
  },
});
