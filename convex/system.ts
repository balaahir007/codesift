import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { create } from "domain";

const validateInternalKey = (key: string | undefined) => {
    const internalKey = process.env.CODESIFT_CONVEX_INTERNAL_KEY;
    if (!internalKey) {
        throw new Error("CODESIFT_CONVEX_INTERNAL_KEY is not set");
    }
    if (key !== internalKey) {
        throw new Error("Invalid internal key");
    }
}
export const getConversationById = query({
    args: {
        id: v.id('conversations'),
        internalKey: v.string(),
    },
    handler: async (ctx, args) => {
        validateInternalKey(args.internalKey);
        return await ctx.db.get("conversations", args.id);
    }
})

export const createMessage = mutation({
    args: {
        conversationId: v.id('conversations'),
        projectId: v.id('projects'),
        role: v.union(v.literal('user'), v.literal('assistant')),
        content: v.string(),
        status: v.optional(
            v.union(
                v.literal("processing"),
                v.literal("completed"),
                v.literal("canceled"),
            )
        ),
        internalKey: v.string(),
    },
    handler: async (ctx, args) => {
        validateInternalKey(args.internalKey);
        const messageId = await ctx.db.insert('messages', {
            conversationId: args.conversationId,
            projectId: args.projectId,
            role: args.role,
            content: args.content,
            status: args.status || "completed",
        });
        
        await ctx.db.patch(args.conversationId, {
            updatedAt: Date.now(),
        });
        return messageId;

    }
})