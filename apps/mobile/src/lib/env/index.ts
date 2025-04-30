/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { env as analyticsEnv } from "@turbostarter/analytics-mobile/env";
import { NodeEnv } from "@turbostarter/shared/constants";
import { ThemeColor, ThemeMode } from "@turbostarter/ui";

const castStringToBool = z.preprocess((val) => {
  if (typeof val === "string") {
    if (["1", "true"].includes(val.toLowerCase())) return true;
    if (["0", "false"].includes(val.toLowerCase())) return false;
  }
  return val;
}, z.coerce.boolean());

export const env = createEnv({
  extends: [analyticsEnv],
  shared: {
    APP_ENV: z.nativeEnum(NodeEnv).default(NodeEnv.DEVELOPMENT),
  },
  clientPrefix: "EXPO_PUBLIC_",
  client: {
    EXPO_PUBLIC_AUTH_PASSWORD: castStringToBool.optional().default(true),
    EXPO_PUBLIC_AUTH_MAGIC_LINK: castStringToBool.optional().default(false),
    EXPO_PUBLIC_AUTH_ANONYMOUS: castStringToBool.optional().default(true),

    EXPO_PUBLIC_SITE_URL: z.string().url(),
    EXPO_PUBLIC_DEFAULT_LOCALE: z.string().optional().default("en"),
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
    EXPO_PUBLIC_AUTH_PASSWORD: process.env.EXPO_PUBLIC_AUTH_PASSWORD,
    EXPO_PUBLIC_AUTH_MAGIC_LINK: process.env.EXPO_PUBLIC_AUTH_MAGIC_LINK,
    EXPO_PUBLIC_AUTH_ANONYMOUS: process.env.EXPO_PUBLIC_AUTH_ANONYMOUS,

    EXPO_PUBLIC_SITE_URL: process.env.EXPO_PUBLIC_SITE_URL,
    EXPO_PUBLIC_DEFAULT_LOCALE: process.env.EXPO_PUBLIC_DEFAULT_LOCALE,
    EXPO_PUBLIC_THEME_MODE: process.env.EXPO_PUBLIC_THEME_MODE,
    EXPO_PUBLIC_THEME_COLOR: process.env.EXPO_PUBLIC_THEME_COLOR,
  },
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  emptyStringAsUndefined: true,
});
