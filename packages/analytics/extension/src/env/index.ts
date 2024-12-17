/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { AnalyticsProvider } from "../types";

const shared = {
  skipValidation:
    (!!import.meta.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(import.meta.env.SKIP_ENV_VALIDATION)) ||
    import.meta.env.npm_lifecycle_event === "lint",
  emptyStringAsUndefined: true,
  clientPrefix: "VITE_",
} as const;

export const provider = z
  .nativeEnum(AnalyticsProvider)
  .optional()
  .default(AnalyticsProvider.GOOGLE_ANALYTICS)
  .parse(import.meta.env.VITE_ANALYTICS_PROVIDER);

const getAnalyticsEnv = () => {
  switch (provider) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    case AnalyticsProvider.GOOGLE_ANALYTICS:
      return createEnv({
        ...shared,
        client: {
          VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID: z.string(),
          VITE_GOOGLE_ANALYTICS_SECRET: z.string(),
          VITE_ANALYTICS_PROVIDER: z
            .literal(AnalyticsProvider.GOOGLE_ANALYTICS)
            .optional()
            .default(AnalyticsProvider.GOOGLE_ANALYTICS),
        },
        runtimeEnv: {
          VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID: import.meta.env
            .VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID,
          VITE_GOOGLE_ANALYTICS_SECRET: import.meta.env
            .VITE_GOOGLE_ANALYTICS_SECRET,
          VITE_ANALYTICS_PROVIDER: provider,
        },
      });
    default:
      throw new Error(`Unsupported analytics provider!`);
  }
};

export const env = getAnalyticsEnv();
