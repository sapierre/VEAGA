"use client";
import dayjs from "dayjs";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useEffect, useState } from "react";
import {
  I18nextProvider,
  initReactI18next,
  useTranslation as useTranslationBase,
} from "react-i18next";

import { getInitOptions, config } from "../config";
import { loadTranslation, makeZodI18nMap } from "../utils";

import type {
  i18n,
  FlatNamespace,
  Namespace,
  KeyPrefix,
  TFunction,
} from "i18next";
import type { FallbackNs, UseTranslationOptions } from "react-i18next";

let client: i18n | null = null;

export const initializeI18nClient = async ({
  locale,
  defaultLocale,
  ns,
}: {
  locale?: string;
  defaultLocale?: string;
  ns?: Namespace;
} = {}) => {
  if (client) {
    return client;
  }

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .use(initReactI18next)
    .use(resourcesToBackend(loadTranslation))
    .use(LanguageDetector)
    .init({
      ...getInitOptions({
        locale,
        defaultLocale,
        ns,
      }),
      detection: {
        order: ["htmlTag", "cookie", "navigator"],
        caches: ["cookie"],
        lookupCookie: config.cookie,
      },
    });

  client = i18n;
  return client;
};

export const useTranslation = <
  Ns extends FlatNamespace | FlatNamespace[] | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(
  ns?: Ns,
  options?: UseTranslationOptions<KPrefix>,
) => {
  const { t, i18n } = useTranslationBase<Ns, KPrefix>(ns, options);

  return {
    t,
    i18n,
    errorMap: makeZodI18nMap({ t: t as TFunction }),
  };
};

export const getI18n = async ({
  locale,
  defaultLocale,
  ns,
}: {
  locale?: string;
  defaultLocale?: string;
  ns?: Namespace;
}) => {
  if (!client) {
    return initializeI18nClient({ locale, defaultLocale, ns });
  }

  await client.changeLanguage(locale);
  dayjs.locale(locale);
  if (ns) {
    await client.loadNamespaces(ns);
  }
  return client;
};

export const I18nProvider = ({
  children,
  locale,
  defaultLocale,
  ns,
}: {
  children: React.ReactNode;
  locale?: string;
  defaultLocale?: string;
  ns?: Namespace;
}) => {
  const [i18nClient, setI18nClient] = useState<i18n | null>(client);

  useEffect(() => {
    void (async () => {
      if (!client) {
        setI18nClient(await getI18n({ locale, defaultLocale, ns }));
      }
    })();
  }, [client]);

  if (!i18nClient) {
    return null;
  }

  if (locale !== i18nClient.language) {
    dayjs.locale(locale);
    void i18nClient.changeLanguage(locale);
  }

  return <I18nextProvider i18n={i18nClient}>{children}</I18nextProvider>;
};

export type { ParseKeys as TranslationKey } from "i18next";
