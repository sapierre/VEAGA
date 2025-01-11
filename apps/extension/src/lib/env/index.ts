/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { env as analyticsEnv } from "@turbostarter/analytics-extension/env";
import { NodeEnv } from "@turbostarter/shared/constants";
import { ThemeColor, ThemeMode } from "@turbostarter/ui";

export const env = createEnv({
  extends: [analyticsEnv],
  shared: {
    NODE_ENV: z.nativeEnum(NodeEnv).default(NodeEnv.DEVELOPMENT),
  },
  clientPrefix: "VITE_",
  client: {
    VITE_SITE_URL: z.string().url(),
    VITE_THEME_MODE: z
      .nativeEnum(ThemeMode)
      .optional()
      .default(ThemeMode.SYSTEM),
    VITE_THEME_COLOR: z
      .nativeEnum(ThemeColor)
      .optional()
      .default(ThemeColor.ORANGE),
  },
  runtimeEnv: {
    VITE_SITE_URL: import.meta.env.VITE_SITE_URL,
    VITE_THEME_MODE: import.meta.env.VITE_THEME_MODE,
    VITE_THEME_COLOR: import.meta.env.VITE_THEME_COLOR,
  },
  skipValidation:
    (!!import.meta.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(import.meta.env.SKIP_ENV_VALIDATION)) ||
    import.meta.env.npm_lifecycle_event === "lint",
  emptyStringAsUndefined: true,
});
