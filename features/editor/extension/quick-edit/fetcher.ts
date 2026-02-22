import ky from "ky"
import { toast } from "sonner"
import z from "zod"
const editRequestSchema = z.object({
    instruction: z.string(),
    fullCode: z.string(),
    selectedCode: z.string(),
    
})
const editResponseSchema = z.object({
    editedCode: z.string()
})

type EditRequest = z.infer<typeof editRequestSchema>
type EditResponse = z.infer<typeof editResponseSchema>

export const fetcher = async (
    payload: EditRequest,
    signal: AbortSignal
): Promise<string | null> => {
    try {
        const validatePayload = editRequestSchema.parse(payload)
        const response = await ky.post("/api/quick-edit", {
            json: validatePayload,
            signal,
            timeout: 30_000,
            retry: 0
        }).json<EditResponse>()

        const validateResponse = editResponseSchema.parse(response)
        return validateResponse.editedCode || null
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            return null;
        }
        toast.error("Failed to fetch AI quick edit")
        return null;
    }
}