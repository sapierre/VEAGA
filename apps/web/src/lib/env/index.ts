/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets-zod";
import { z } from "zod";

import { env as analyticsEnv } from "@turbostarter/analytics-web/env";
import { env as apiEnv } from "@turbostarter/api/env";
import { env as authEnv } from "@turbostarter/auth/env";
import { env as i18nEnv } from "@turbostarter/i18n/env";
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
  extends: [vercel(), apiEnv, authEnv, analyticsEnv, i18nEnv],
  shared: {
    NODE_ENV: z.nativeEnum(NodeEnv).default(NodeEnv.DEVELOPMENT),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    CONTACT_EMAIL: z.string().email(),
  },

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_AUTH_PASSWORD: castStringToBool.optional().default(true),
    NEXT_PUBLIC_AUTH_MAGIC_LINK: castStringToBool.optional().default(false),
    NEXT_PUBLIC_AUTH_PASSKEY: castStringToBool.optional().default(true),
    NEXT_PUBLIC_AUTH_ANONYMOUS: castStringToBool.optional().default(true),

    NEXT_PUBLIC_PRODUCT_NAME: z.string(),
    NEXT_PUBLIC_URL: z.string().url(),
    NEXT_PUBLIC_DEFAULT_LOCALE: z.string().optional().default("en"),
    NEXT_PUBLIC_THEME_MODE: z
      .nativeEnum(ThemeMode)
      .optional()
      .default(ThemeMode.SYSTEM),
    NEXT_PUBLIC_THEME_COLOR: z
      .nativeEnum(ThemeColor)
      .optional()
      .default(ThemeColor.ORANGE),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_AUTH_PASSWORD: process.env.NEXT_PUBLIC_AUTH_PASSWORD,
    NEXT_PUBLIC_AUTH_MAGIC_LINK: process.env.NEXT_PUBLIC_AUTH_MAGIC_LINK,
    NEXT_PUBLIC_AUTH_PASSKEY: process.env.NEXT_PUBLIC_AUTH_PASSKEY,
    NEXT_PUBLIC_AUTH_ANONYMOUS: process.env.NEXT_PUBLIC_AUTH_ANONYMOUS,

    NEXT_PUBLIC_PRODUCT_NAME: process.env.NEXT_PUBLIC_PRODUCT_NAME,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
    NEXT_PUBLIC_THEME_MODE: process.env.NEXT_PUBLIC_THEME_MODE,
    NEXT_PUBLIC_THEME_COLOR: process.env.NEXT_PUBLIC_THEME_COLOR,
  },
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  emptyStringAsUndefined: true,
});
