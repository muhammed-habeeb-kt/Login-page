import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Submit a face verification request.
 * Decoupled so it can later be called from a Telegram webhook.
 */
export const submitVerification = mutation({
  args: {
    username: v.string(),
    passwordHash: v.string(),
    selfieBase64: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const id = await ctx.db.insert("faceVerifications", {
      userId,
      username: args.username,
      passwordHash: args.passwordHash,
      selfieBase64: args.selfieBase64,
      status: "pending",
      createdAt: Date.now(),
    });

    return id;
  },
});

/**
 * Get the latest verification status for the current user.
 */
export const getVerificationStatus = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const results = await ctx.db
      .query("faceVerifications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .first();

    return results ?? null;
  },
});

/**
 * Update verification status (demo: simulates backend processing).
 */
export const updateStatus = mutation({
  args: {
    verificationId: v.id("faceVerifications"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("verified"),
      v.literal("failed"),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.verificationId, { status: args.status });
  },
});
