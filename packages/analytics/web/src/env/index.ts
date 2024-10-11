/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import { AnalyticsProvider } from "../types";

const shared = {
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  emptyStringAsUndefined: true,
} as const;

const { NEXT_PUBLIC_ANALYTICS_PROVIDER } = createEnv({
  ...shared,
  client: {
    NEXT_PUBLIC_ANALYTICS_PROVIDER: z
      .nativeEnum(AnalyticsProvider)
      .optional()
      .default(AnalyticsProvider.VERCEL),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ANALYTICS_PROVIDER: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER,
  },
});

const getAnalyticsEnv = () => {
  switch (NEXT_PUBLIC_ANALYTICS_PROVIDER) {
    case AnalyticsProvider.VERCEL:
      return {
        NEXT_PUBLIC_ANALYTICS_PROVIDER,
      };
    case AnalyticsProvider.POSTHOG:
      return {
        ...createEnv({
          ...shared,
          client: {
            NEXT_PUBLIC_POSTHOG_KEY: z.string(),
            NEXT_PUBLIC_POSTHOG_HOST: z.string(),
          },
          experimental__runtimeEnv: {
            NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
            NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
          },
        }),
        NEXT_PUBLIC_ANALYTICS_PROVIDER,
      };
    case AnalyticsProvider.OPEN_PANEL:
      return {
        ...createEnv({
          ...shared,
          client: {
            NEXT_PUBLIC_OPEN_PANEL_CLIENT_ID: z.string(),
          },
          server: {
            OPEN_PANEL_SECRET: z.string(),
          },
          experimental__runtimeEnv: {
            NEXT_PUBLIC_OPEN_PANEL_CLIENT_ID:
              process.env.NEXT_PUBLIC_OPEN_PANEL_CLIENT_ID,
          },
        }),
        NEXT_PUBLIC_ANALYTICS_PROVIDER,
      };
    case AnalyticsProvider.GOOGLE_ANALYTICS:
      return {
        ...createEnv({
          ...shared,
          client: {
            NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID: z.string(),
          },
          server: {
            GOOGLE_ANALYTICS_SECRET: z.string(),
          },
          experimental__runtimeEnv: {
            NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID:
              process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID,
          },
        }),
        NEXT_PUBLIC_ANALYTICS_PROVIDER,
      };
    default:
      throw new Error(`Unsupported analytics provider!`);
  }
};

export const env = getAnalyticsEnv();
