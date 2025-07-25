import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { envConfig } from "@turbostarter/shared/constants";

export const env = createEnv({
  ...envConfig,
  clientPrefix: "EXPO_PUBLIC_",
  client: {
    EXPO_PUBLIC_POSTHOG_KEY: z.string(),
    EXPO_PUBLIC_POSTHOG_HOST: z
      .string()
      .optional()
      .default("https://us.i.posthog.com"),
  },
  runtimeEnv: process.env,
});
