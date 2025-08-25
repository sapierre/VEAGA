/* eslint-disable no-restricted-properties */
import { defineEnv } from "envin";
import { vercel } from "envin/presets/zod";
import * as z from "zod";

import { preset as analytics } from "@turbostarter/analytics-web/env";
import { preset as api } from "@turbostarter/api/env";
import { preset as i18n } from "@turbostarter/i18n/env";
import { envConfig, NodeEnv } from "@turbostarter/shared/constants";
import { ThemeColor, ThemeMode } from "@turbostarter/ui";

const castStringToBool = z.preprocess((val) => {
  if (typeof val === "string") {
    if (["1", "true"].includes(val.toLowerCase())) return true;
    if (["0", "false"].includes(val.toLowerCase())) return false;
  }
  return val;
}, z.coerce.boolean());

export default defineEnv({
  ...envConfig,
  extends: [vercel, api, analytics, i18n],
  shared: {
    NODE_ENV: z.enum(NodeEnv).default(NodeEnv.DEVELOPMENT),
    ANALYZE: castStringToBool.optional().default(false),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    CONTACT_EMAIL: z.email(),
  },

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_AUTH_PASSWORD: castStringToBool.optional().default(true),
    NEXT_PUBLIC_AUTH_MAGIC_LINK: castStringToBool.optional().default(false),
    NEXT_PUBLIC_AUTH_PASSKEY: castStringToBool.optional().default(true),
    NEXT_PUBLIC_AUTH_ANONYMOUS: castStringToBool.optional().default(true),

    NEXT_PUBLIC_PRODUCT_NAME: z.string(),
    NEXT_PUBLIC_URL: z.url(),
    NEXT_PUBLIC_DEFAULT_LOCALE: z.string().optional().default("en"),
    NEXT_PUBLIC_THEME_MODE: z
      .enum(ThemeMode)
      .optional()
      .default(ThemeMode.SYSTEM),
    NEXT_PUBLIC_THEME_COLOR: z
      .enum(ThemeColor)
      .optional()
      .default(ThemeColor.ORANGE),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  env: {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV,
    ANALYZE: process.env.ANALYZE,

    NEXT_PUBLIC_AUTH_PASSWORD: process.env.NEXT_PUBLIC_AUTH_PASSWORD,
    NEXT_PUBLIC_AUTH_MAGIC_LINK: process.env.NEXT_PUBLIC_AUTH_MAGIC_LINK,
    NEXT_PUBLIC_AUTH_PASSKEY: process.env.NEXT_PUBLIC_AUTH_PASSKEY,
    NEXT_PUBLIC_AUTH_ANONYMOUS: process.env.NEXT_PUBLIC_AUTH_ANONYMOUS,

    NEXT_PUBLIC_PRODUCT_NAME: process.env.NEXT_PUBLIC_PRODUCT_NAME,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
    NEXT_PUBLIC_THEME_MODE: process.env.NEXT_PUBLIC_THEME_MODE,
    NEXT_PUBLIC_THEME_COLOR: process.env.NEXT_PUBLIC_THEME_COLOR,

    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
});
