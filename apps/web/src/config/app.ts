import { env } from "~/lib/env";

export const appConfig = {
  name: env.NEXT_PUBLIC_PRODUCT_NAME,
  title: env.NEXT_PUBLIC_SITE_TITLE,
  link: env.NEXT_PUBLIC_SITE_LINK,
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
} as const;
