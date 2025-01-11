import { openai } from "@ai-sdk/openai";
import { zValidator } from "@hono/zod-validator";
import { convertToCoreMessages, streamText } from "ai";
import { Hono } from "hono";
import { z } from "zod";

export const aiRouter = new Hono().post(
  "/chat",
  zValidator(
    "json",
    z.object({
      messages: z.array(
        z.object({
          role: z.enum(["user", "system", "data", "assistant"]),
          content: z.string(),
        }),
      ),
    }),
  ),
  (c) =>
    streamText({
      model: openai("gpt-4o"),
      messages: convertToCoreMessages(c.req.valid("json").messages),
    }).toDataStreamResponse(),
);
