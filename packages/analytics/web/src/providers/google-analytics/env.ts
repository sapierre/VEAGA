/* eslint-disable turbo/no-undeclared-env-vars */
import { defineEnv } from "envin";
import * as z from "zod";

import { envConfig } from "@turbostarter/shared/constants";

import type { Preset } from "envin/types";

export const preset = {
  id: "google-analytics",
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID: z.string(),
  },
  server: {
    GOOGLE_ANALYTICS_SECRET: z.string(),
  },
} as const satisfies Preset;

export const env = defineEnv({
  ...envConfig,
  ...preset,
  env: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID,
  },
});
