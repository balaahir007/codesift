import { createOpenAI } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";
import { generateText, Output } from "ai"
import { NextResponse } from "next/server"
import { z } from 'zod';

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const suggestionSchema = z.object({
    suggestion: z.string().describe("The code to insert at cursor or empty string if no completion needed")
});

export async function POST(request: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 403 }
            )
        }

        const {
            fileName,
            code,
            currentLine,
            previousLines,
            textBeforeCursor,
            textAfterCursor,
            nextLines,
            lineNumber,
        } = await request.json()

        if (!code) {
            return NextResponse.json({ error: 'Code is required' }, { status: 400 })
        }

        const prompt = `
You are a code suggestion assistant.

<context>
<file_name>${fileName}</file_name>
<previous_lines>${previousLines || ""}</previous_lines>
<current_line number="${lineNumber}">${currentLine}</current_line>
<before_cursor>${textBeforeCursor}</before_cursor>
<after_cursor>${textAfterCursor}</after_cursor>
<next_lines>${nextLines || ""}</next_lines>
<full_code>${code}</full_code>
</context>

Follow these steps IN ORDER:
1. If next_lines continues from cursor, return empty string.
2. If before_cursor ends with complete statement (;, }, )), return empty string.
3. Otherwise suggest what should be typed at cursor.
`;

        const { output } = await generateText({
            model: openai("gpt-4o-mini"),
            output: Output.object({ schema: suggestionSchema }),
            prompt
        });

        return NextResponse.json({ suggestion: output.suggestion });

    } catch (error) {
        console.log("Suggestion error : ", error);
        return NextResponse.json(
            { error: "Failed to generate suggestion" },
            { status: 400 }
        );
    }
}
