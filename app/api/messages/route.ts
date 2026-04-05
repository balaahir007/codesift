import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convex } from "@/lib/convex-client";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import z, { success } from "zod";

const requestSchema = z.object({
    conversationId: z.string(),
    message: z.string(),
})

export async function POST(request: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const internalKey = process.env.CODESIFT_CONVEX_INTERNAL_KEY;
    if (!internalKey) {
        console.error("CODESIFT_CONVEX_INTERNAL_KEY is not set");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const body = await request.json();
    const { conversationId, message } = requestSchema.parse(body);

    const conversation = await convex.query(api.system.getConversationById, { id: conversationId as Id<"conversations">, internalKey });


    if (!conversation) {
        return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }
    const projectId = conversation.projectId;
    
    await convex.mutation(api.system.createMessage, {
        conversationId: conversationId as Id<"conversations">,
        projectId,
        role: "user",
        content: message,
        internalKey,

    })
    
    const assitenreMessageId = await convex.mutation(api.system.createMessage, {
        conversationId: conversationId as Id<"conversations">,
        projectId,
        role: "assistant",
        content: "",
        status: "processing",
        internalKey,
    })


    return NextResponse.json({ success: true, eventId: 0, messageId: assitenreMessageId });

}