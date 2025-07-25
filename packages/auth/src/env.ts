import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { envConfig } from "@turbostarter/shared/constants";

export const env = createEnv({
  ...envConfig,
  server: {
    BETTER_AUTH_SECRET: z.string(),

    GITHUB_CLIENT_ID: z.string().optional().default(""),
    GITHUB_CLIENT_SECRET: z.string().optional().default(""),
    GOOGLE_CLIENT_ID: z.string().optional().default(""),
    GOOGLE_CLIENT_SECRET: z.string().optional().default(""),
  },
  runtimeEnv: process.env,
});
