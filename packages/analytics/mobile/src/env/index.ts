/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { AnalyticsProvider } from "../types";

const shared = {
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  emptyStringAsUndefined: true,
  clientPrefix: "EXPO_PUBLIC_",
} as const;

const { EXPO_PUBLIC_ANALYTICS_PROVIDER } = createEnv({
  ...shared,
  client: {
    EXPO_PUBLIC_ANALYTICS_PROVIDER: z
      .nativeEnum(AnalyticsProvider)
      .optional()
      .default(AnalyticsProvider.GOOGLE_ANALYTICS),
  },
  runtimeEnv: {
    EXPO_PUBLIC_ANALYTICS_PROVIDER: process.env.EXPO_PUBLIC_ANALYTICS_PROVIDER,
  },
});

const getAnalyticsEnv = () => {
  switch (EXPO_PUBLIC_ANALYTICS_PROVIDER) {
    case AnalyticsProvider.GOOGLE_ANALYTICS:
      return {
        EXPO_PUBLIC_ANALYTICS_PROVIDER,
      };
    case AnalyticsProvider.POSTHOG:
      return {
        ...createEnv({
          ...shared,
          client: {
            EXPO_PUBLIC_POSTHOG_KEY: z.string(),
            EXPO_PUBLIC_POSTHOG_HOST: z.string(),
          },
          runtimeEnv: {
            EXPO_PUBLIC_POSTHOG_KEY: process.env.EXPO_PUBLIC_POSTHOG_KEY,
            EXPO_PUBLIC_POSTHOG_HOST: process.env.EXPO_PUBLIC_POSTHOG_HOST,
          },
        }),
        EXPO_PUBLIC_ANALYTICS_PROVIDER,
      };
    default:
      throw new Error(`Unsupported analytics provider!`);
  }
};

export const env = getAnalyticsEnv();
