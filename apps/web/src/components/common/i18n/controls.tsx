"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

import { getPathname } from "@turbostarter/i18n";
import { LocaleCustomizer } from "@turbostarter/ui-web/i18n";

import { appConfig } from "~/config/app";

import { setLocaleCookie } from "./actions";

import type { Locale } from "@turbostarter/i18n";

export const I18nControls = () => {
  const router = useRouter();
  const path = usePathname();

  const onChange = useCallback(
    async (locale: Locale) => {
      await setLocaleCookie(locale);
      router.push(
        getPathname({
          locale,
          path,
          defaultLocale: appConfig.locale,
        }),
      );
      router.refresh();
    },
    [path, router],
  );

  return <LocaleCustomizer onChange={onChange} />;
};
