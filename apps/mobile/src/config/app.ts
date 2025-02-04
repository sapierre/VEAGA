import { env } from "~/lib/env";

export const appConfig = {
  locale: env.EXPO_PUBLIC_DEFAULT_LOCALE,
  theme: {
    mode: env.EXPO_PUBLIC_THEME_MODE,
    color: env.EXPO_PUBLIC_THEME_COLOR,
  },
} as const;
