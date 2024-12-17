import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../trpc";

export const aiRouter = createTRPCRouter({
  chat: publicProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "system", "data", "assistant"]),
            content: z.string(),
          }),
        ),
      }),
    )
    .mutation(async function* ({ input }) {
      const result = streamText({
        model: openai("gpt-4o"),
        messages: convertToCoreMessages(input.messages),
      });

      for await (const chunk of result.textStream) {
        yield chunk;
      }
    }),
});
