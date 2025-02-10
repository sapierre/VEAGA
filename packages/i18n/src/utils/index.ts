import { config } from "../config";
import { translations } from "../translations";

import type { TranslationKey } from "../client";
import type { DefaultNamespace, Namespace, ReadCallback, i18n } from "i18next";

export const loadTranslation = async (
  locale: (typeof config.locales)[number],
  namespace: (typeof config.namespaces)[number],
  callback: ReadCallback,
) => {
  try {
    const data = await translations[locale][namespace]();

    return callback(null, data.default);
  } catch {
    console.log(`Error loading i18n file: ${locale}/${namespace}.json`);

    return {};
  }
};

export const isKey = <T extends Namespace = DefaultNamespace>(
  key: string,
  i18n?: i18n,
  ns?: T,
): key is TranslationKey<T> => {
  return i18n?.exists(key, { ns }) ?? false;
};

export const isLocaleSupported = (
  locale: string,
): locale is (typeof config.locales)[number] => config.locales.includes(locale);

export const getPathname = ({
  locale,
  path,
  defaultLocale,
}: {
  locale: string;
  path: string;
  defaultLocale?: string;
}) => {
  const pathname = path.replace(
    new RegExp(`^/(${config.locales.join("|")})`),
    "",
  );

  if (locale === (defaultLocale ?? config.defaultLocale)) {
    return pathname;
  }

  return `/${locale}${pathname}`;
};

export * from "./validation";
