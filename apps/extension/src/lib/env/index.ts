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
  clientPrefix: "PLASMO_PUBLIC_",
  client: {
    PLASMO_PUBLIC_AUTH_COOKIE_NAME: z.string(),
    PLASMO_PUBLIC_SITE_URL: z.string().url(),
    PLASMO_PUBLIC_SUPABASE_URL: z.string().url(),
    PLASMO_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    PLASMO_PUBLIC_THEME_MODE: z
      .nativeEnum(ThemeMode)
      .optional()
      .default(ThemeMode.SYSTEM),
    PLASMO_PUBLIC_THEME_COLOR: z
      .nativeEnum(ThemeColor)
      .optional()
      .default(ThemeColor.ORANGE),
  },
  runtimeEnv: {
    PLASMO_PUBLIC_AUTH_COOKIE_NAME: process.env.PLASMO_PUBLIC_AUTH_COOKIE_NAME,
    PLASMO_PUBLIC_SITE_URL: process.env.PLASMO_PUBLIC_SITE_URL,
    PLASMO_PUBLIC_SUPABASE_URL: process.env.PLASMO_PUBLIC_SUPABASE_URL,
    PLASMO_PUBLIC_SUPABASE_ANON_KEY:
      process.env.PLASMO_PUBLIC_SUPABASE_ANON_KEY,
    PLASMO_PUBLIC_THEME_MODE: process.env.PLASMO_PUBLIC_THEME_MODE,
    PLASMO_PUBLIC_THEME_COLOR: process.env.PLASMO_PUBLIC_THEME_COLOR,
  },
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  emptyStringAsUndefined: true,
});
