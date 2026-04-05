import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { verifyAuth } from "./auth";

export const create = mutation({
    args: {
        projectId: v.id('projects'),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const { projectId, title } = args;

        const identity = await verifyAuth(ctx);
        const project = await ctx.db.get("projects", projectId);
        if (!project) {
            throw new Error("Project not found")
        }
        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to access this project")
        }
        if (!identity) {
            throw new Error("Unauthorized")
        }
        const conversationId = await ctx.db.insert('conversations', {
            projectId,
            title,
            updatedAt: Date.now(),
        })
        return conversationId;
    }

}
)

export const getById = query({
    args: {
        id: v.id('conversations'),

    },
    handler: async (ctx, args) => {

        const { id } = args;
        const conversation = await ctx.db.get("conversations", id);
        if (!conversation) {
            throw new Error("Conversation not found")
        }
        const identity = await verifyAuth(ctx);
        if (!identity) {
            throw new Error("Unauthorized")
        }
        const project = await ctx.db.get("projects", conversation.projectId);
        if (!project) {
            throw new Error("Project not found")
        }
        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to access this conversation")
        }
        return conversation;
    }
})

export const getByProjectId = query({
    args: {
        projectId: v.id('projects'),
    },
    handler: async (ctx, args) => {
        const { projectId } = args;
        const identity = await verifyAuth(ctx);
        if (!identity) {
            throw new Error("Unauthorized")
        }
        const project = await ctx.db.get("projects", projectId)
        if (!project) {
            throw new Error("Project not found")
        }
        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to access this project")
        }
        return await ctx.db.query("conversations").withIndex("by_project", (q) => q.eq("projectId", projectId)).order("desc").collect()
    }

})

export const sendMessage = mutation({
    args: {
        conversationId: v.id('conversations'),
        content: v.string(),
        role: v.union(v.literal('user'), v.literal('assistant')),
    },
    handler: async (ctx, args) => {
        const { conversationId, content, role } = args;
        const identity = await verifyAuth(ctx);
        if (!identity) {
            throw new Error("Unauthorized")
        }
        const conversation = await ctx.db.get("conversations", conversationId);
        if (!conversation) {
            throw new Error("Conversation not found")
        }
        const project = await ctx.db.get("projects", conversation.projectId);
        if (!project) {
            throw new Error("Project not found")
        }
        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to access this conversation")
        }

        const messageId = await ctx.db.insert('messages', {
            conversationId,
            projectId: conversation.projectId,
            role,
            content,
            status: "completed",
        });

        await ctx.db.patch(conversationId, {
            updatedAt: Date.now(),
        });

        return messageId;
    }
})

export const getMessages = query({
    args: {
        conversationId: v.id('conversations'),
    },
    handler: async (ctx, args) => {
        const { conversationId } = args;
        const identity = await verifyAuth(ctx);
        if (!identity) {
            throw new Error("Unauthorized")
        }
        const conversation = await ctx.db.get("conversations", conversationId);
        if (!conversation) {
            throw new Error("Conversation not found")
        }
        const project = await ctx.db.get("projects", conversation.projectId);
        if (!project) {
            throw new Error("Project not found")
        }

        if (project.ownerId !== identity.subject) {
            throw new Error("Unauthorized to access this conversation")
        }

        return await ctx.db.query("messages").withIndex("by_conversation", (q) => q.eq("conversationId", conversationId)).order("asc").collect();
        
    }
})