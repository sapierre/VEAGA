import { middleware as i18nMiddleware } from "@turbostarter/i18n/server";

import { appConfig } from "~/config/app";

import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) =>
  i18nMiddleware(request, {
    defaultLocale: appConfig.locale,
  });

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
  unstable_allowDynamic: ["lodash"],
};
