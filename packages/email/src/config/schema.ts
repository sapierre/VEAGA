import { z } from "zod";

import { ThemeColor } from "@turbostarter/ui";

import { EmailProvider } from "../types";

export const emailConfigSchema = z.object({
  provider: z
    .nativeEnum(EmailProvider)
    .optional()
    .default(EmailProvider.RESEND),
  from: z.string(),
  theme: z.nativeEnum(ThemeColor).optional().default(ThemeColor.ORANGE),
});
