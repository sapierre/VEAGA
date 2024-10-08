/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { NodeEnv } from "@turbostarter/shared/constants";
import { ThemeColor, ThemeMode } from "@turbostarter/ui";

export const env = createEnv({
  shared: {
    APP_ENV: z.nativeEnum(NodeEnv).default(NodeEnv.DEVELOPMENT),
  },
  clientPrefix: "EXPO_PUBLIC_",
  client: {
    EXPO_PUBLIC_SUPABASE_URL: z.string().url(),
    EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string(),

    EXPO_PUBLIC_AUTH_PASSWORD: z
      .enum(["true", "false"])
      .optional()
      .default("true")
      .transform((value) => value === "true"),
    EXPO_PUBLIC_AUTH_MAGIC_LINK: z
      .enum(["true", "false"])
      .optional()
      .default("false")
      .transform((value) => value === "true"),

    EXPO_PUBLIC_SITE_URL: z.string().url(),
    EXPO_PUBLIC_THEME_MODE: z
      .nativeEnum(ThemeMode)
      .optional()
      .default(ThemeMode.SYSTEM),
    EXPO_PUBLIC_THEME_COLOR: z
      .nativeEnum(ThemeColor)
      .optional()
      .default(ThemeColor.ORANGE),
  },
  runtimeEnv: {
    EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
    EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,

    EXPO_PUBLIC_AUTH_PASSWORD: process.env.EXPO_PUBLIC_AUTH_PASSWORD,
    EXPO_PUBLIC_AUTH_MAGIC_LINK: process.env.EXPO_PUBLIC_AUTH_MAGIC_LINK,

    EXPO_PUBLIC_SITE_URL: process.env.EXPO_PUBLIC_SITE_URL,
    EXPO_PUBLIC_THEME_MODE: process.env.EXPO_PUBLIC_THEME_MODE,
    EXPO_PUBLIC_THEME_COLOR: process.env.EXPO_PUBLIC_THEME_COLOR,
  },
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  emptyStringAsUndefined: true,
});
