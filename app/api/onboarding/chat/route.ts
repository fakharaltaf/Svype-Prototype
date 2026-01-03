import { convertToModelMessages, streamText, tool, type UIMessage, validateUIMessages } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

export const maxDuration = 30

const finishOnboardingTool = tool({
  description: "Mark the user's career onboarding as complete and save their summarized profile details.",
  inputSchema: z.object({
    career_goals: z.string().describe("A summary of the user's career aspirations."),
    interests: z.string().describe("Key professional and personal interests."),
    life_goals: z.string().describe("A summary of the user's general life goals."),
  }),
  execute: async ({ career_goals, interests, life_goals }) => {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return { error: "User not authenticated" }

    const { error } = await supabase
      .from("profiles")
      .update({
        career_goals,
        interests,
        life_goals,
        onboarding_completed: true,
      })
      .eq("id", user.id)

    if (error) return { error: error.message }
    return { success: true }
  },
})

const tools = {
  finishOnboarding: finishOnboardingTool,
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const validatedMessages = await validateUIMessages({
    messages,
    tools,
  })

  const result = streamText({
    model: "openai/gpt-4o",
    system: `You are Talash AI, a helpful career coach. 
    Your goal is to interview the user about their career goals, interests, and general life aspirations. 
    Be friendly and conversational, like a mentor.
    Ask one question at a time.
    Once you have a good understanding of all three areas (career, interests, life goals), call the 'finishOnboarding' tool to save their profile and conclude the onboarding.`,
    messages: convertToModelMessages(validatedMessages),
    tools,
  })

  return result.toUIMessageStreamResponse()
}
