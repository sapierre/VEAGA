import { env } from "~/lib/env";

export const appConfig = {
  name: env.NEXT_PUBLIC_PRODUCT_NAME,
  title: env.NEXT_PUBLIC_SITE_TITLE,
  link: env.NEXT_PUBLIC_SITE_URL,
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
  theme: {
    mode: env.NEXT_PUBLIC_THEME_MODE,
    color: env.NEXT_PUBLIC_THEME_COLOR,
  },
} as const;
