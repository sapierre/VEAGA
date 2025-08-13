import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

import { envConfig } from "@turbostarter/shared/constants";
import { ThemeColor } from "@turbostarter/ui";

import { env as providerEnv } from "./providers/env";

export const env = createEnv({
  ...envConfig,
  extends: [providerEnv],
  server: {
    EMAIL_THEME: z.enum(ThemeColor).optional().default(ThemeColor.ORANGE),
    PRODUCT_NAME: z.string().optional(),
  },
  runtimeEnv: process.env,
});
