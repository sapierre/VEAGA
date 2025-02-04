import { match } from "@formatjs/intl-localematcher";
import dayjs from "dayjs";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import Negotiator from "negotiator";
import { cookies } from "next/headers";
import { i18nRouter } from "next-i18n-router";
import { initReactI18next } from "react-i18next/initReactI18next";

import { config, getInitOptions } from "../config";
import { loadTranslation, makeZodI18nMap } from "../utils";

import { env } from "./env";

import type { i18n, Namespace, TFunction } from "i18next";
import type { NextRequest } from "next/server";

export const initializeServerI18n = async ({
  locale,
  defaultLocale,
  ns,
}: {
  locale?: string;
  defaultLocale?: string;
  ns?: Namespace;
}): Promise<i18n> => {
  const i18n = createInstance();

  await i18n
    .use(initReactI18next)
    .use(resourcesToBackend(loadTranslation))
    .init(getInitOptions({ locale, defaultLocale, ns }));

  return i18n;
};

const getLocaleFromCookies = async () => {
  try {
    const locale = (await cookies()).get(config.cookie)?.value;
    if (locale) return locale;
  } catch {
    return null;
  }
};

export const getLocaleFromRequest = (request?: Request) => {
  if (!request) return env.DEFAULT_LOCALE ?? config.defaultLocale;

  const localeCookie = request.headers
    .get("cookie")
    ?.split(";")
    .find((cookie) => cookie.trim().startsWith(`${config.cookie}=`))
    ?.split("=")[1]
    ?.trim()
    .replace(/[.,]/g, "");

  if (localeCookie) {
    return localeCookie;
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value: string, key: string) => {
    negotiatorHeaders[key] = value;
  });

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    return match(
      languages,
      config.locales,
      env.DEFAULT_LOCALE ?? config.defaultLocale,
    );
  } catch {
    return env.DEFAULT_LOCALE ?? config.defaultLocale;
  }
};

export const getTranslation = async <T extends Namespace>({
  locale: passedLocale,
  ns,
}: { locale?: string; ns?: T } = {}) => {
  const locale = passedLocale ?? (await getLocaleFromCookies()) ?? undefined;
  const i18nextInstance = await initializeServerI18n({ locale, ns });
  dayjs.locale(locale);

  const t = i18nextInstance.getFixedT<T>(
    i18nextInstance.language,
    ns,
  ) as TFunction<T>;

  return {
    t,
    i18n: i18nextInstance,
    errorMap: makeZodI18nMap({
      t: t as TFunction,
    }),
  };
};

export const middleware = (
  request: NextRequest,
  options?: Partial<Parameters<typeof i18nRouter>[1]>,
) =>
  i18nRouter(request, {
    locales: config.locales,
    defaultLocale:
      options?.defaultLocale ?? env.DEFAULT_LOCALE ?? config.defaultLocale,
    localeCookie: config.cookie,
    localeDetector: getLocaleFromRequest,
    ...options,
  });

export * from "./with-i18n";
