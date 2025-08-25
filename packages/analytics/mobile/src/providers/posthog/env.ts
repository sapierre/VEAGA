import { defineEnv } from "envin";
import * as z from "zod";

import { envConfig } from "@turbostarter/shared/constants";

import type { Preset } from "envin/types";

export const preset = {
  id: "posthog",
  clientPrefix: "EXPO_PUBLIC_",
  client: {
    EXPO_PUBLIC_POSTHOG_KEY: z.string(),
    EXPO_PUBLIC_POSTHOG_HOST: z
      .string()
      .optional()
      .default("https://us.i.posthog.com"),
  },
} as const satisfies Preset;

export const env = defineEnv({
  ...envConfig,
  ...preset,
});
