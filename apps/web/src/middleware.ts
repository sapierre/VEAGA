import env from "env.config";
import { i18nRouter } from "next-i18n-router";

import { config as i18nConfig } from "@turbostarter/i18n";
import { getLocaleFromRequest } from "@turbostarter/i18n/server";

import { appConfig } from "~/config/app";

import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) =>
  i18nRouter(request, {
    locales: i18nConfig.locales,
    defaultLocale:
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      appConfig.locale ?? env.DEFAULT_LOCALE ?? i18nConfig.defaultLocale,
    localeCookie: i18nConfig.cookie,
    localeDetector: getLocaleFromRequest,
  });

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
  unstable_allowDynamic: ["lodash"],
};
