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
  clientPrefix: "PLASMO_PUBLIC_",
} as const;

const { PLASMO_PUBLIC_ANALYTICS_PROVIDER } = createEnv({
  ...shared,
  client: {
    PLASMO_PUBLIC_ANALYTICS_PROVIDER: z
      .nativeEnum(AnalyticsProvider)
      .optional()
      .default(AnalyticsProvider.GOOGLE_ANALYTICS),
  },
  runtimeEnv: {
    PLASMO_PUBLIC_ANALYTICS_PROVIDER:
      process.env.EXPO_PUBLIC_ANALYTICS_PROVIDER,
  },
});

const getAnalyticsEnv = () => {
  switch (PLASMO_PUBLIC_ANALYTICS_PROVIDER) {
    case AnalyticsProvider.GOOGLE_ANALYTICS:
      return {
        ...createEnv({
          ...shared,
          client: {
            PLASMO_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID: z.string(),
            PLASMO_PUBLIC_GOOGLE_ANALYTICS_SECRET: z.string(),
          },
          runtimeEnv: {
            PLASMO_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID:
              process.env.PLASMO_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID,
            PLASMO_PUBLIC_GOOGLE_ANALYTICS_SECRET:
              process.env.PLASMO_PUBLIC_GOOGLE_ANALYTICS_SECRET,
          },
        }),
        PLASMO_PUBLIC_ANALYTICS_PROVIDER,
      };
    default:
      throw new Error(`Unsupported analytics provider!`);
  }
};

export const env = getAnalyticsEnv();
