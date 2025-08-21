import { defineEnv } from "envin";
import * as z from "zod";

import { envConfig } from "@turbostarter/shared/constants";

import type { Preset } from "envin/types";

export const preset = {
  id: "auth",
  server: {
    BETTER_AUTH_SECRET: z.string(),

    GITHUB_CLIENT_ID: z.string().optional().default(""),
    GITHUB_CLIENT_SECRET: z.string().optional().default(""),
    GOOGLE_CLIENT_ID: z.string().optional().default(""),
    GOOGLE_CLIENT_SECRET: z.string().optional().default(""),
  },
} as const satisfies Preset;

export const env = defineEnv({
  ...envConfig,
  ...preset,
});
