import { ThemeColor } from "@turbostarter/ui";

import { EmailProvider } from "../types";

import { emailConfigSchema } from "./schema";

import type { EmailConfig } from "../types";

export const config = emailConfigSchema.parse({
  provider: EmailProvider.RESEND,
  from: "hello@resend.dev",
  theme: ThemeColor.ORANGE,
}) satisfies EmailConfig;
