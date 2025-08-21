import { defineEnv } from "envin";
import * as z from "zod";

import { envConfig } from "@turbostarter/shared/constants";
import { ThemeColor } from "@turbostarter/ui";

import { preset as providerPreset } from "./providers/env";

import type { Preset } from "envin/types";

export const preset = {
  id: "email",
  server: {
    EMAIL_THEME: z.enum(ThemeColor).optional().default(ThemeColor.ORANGE),
    PRODUCT_NAME: z.string().optional(),
  },
  extends: [providerPreset],
} as const satisfies Preset;

export const env = defineEnv({
  ...envConfig,
  ...preset,
});
