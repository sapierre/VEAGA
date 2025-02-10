import { isKey } from "@turbostarter/i18n";
import { getTranslation } from "@turbostarter/i18n/server";

import { appConfig } from "~/config/app";
import { env } from "~/lib/env";

import type { TranslationKey } from "@turbostarter/i18n";
import type { Metadata, Viewport } from "next";

type OpenGraphType =
  | "article"
  | "book"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "profile"
  | "website"
  | "video.tv_show"
  | "video.other"
  | "video.movie"
  | "video.episode";

interface SeoProps {
  readonly title?: TranslationKey | (string & Record<never, never>);
  readonly description?: TranslationKey | (string & Record<never, never>);
  readonly image?: string;
  readonly url?: string;
  readonly canonical?: string;
  readonly type?: OpenGraphType;
}

const SITE_NAME_SEPARATOR = " | ";
export const SITE_NAME_TEMPLATE = `%s${SITE_NAME_SEPARATOR}${env.NEXT_PUBLIC_PRODUCT_NAME}`;

export const getMetadata =
  (
    {
      title,
      description = "common:product.description",
      url,
      canonical,
      type = "website",
    } = {} as SeoProps,
  ) =>
  async ({
    params,
  }: {
    params?: Promise<{ locale: string }>;
  }): Promise<Metadata> => {
    const { t, i18n } = await getTranslation({
      locale: (await params)?.locale,
    });

    const common = {
      ...(title && {
        title: isKey(title, i18n) ? (t(title) as string) : title,
      }),
      description: isKey(description, i18n)
        ? (t(description) as string)
        : description,
    };

    return {
      ...common,
      openGraph: {
        ...common,
        url: url ? url : canonical ? canonical : appConfig.url,
        siteName: env.NEXT_PUBLIC_PRODUCT_NAME,
        type,
      },
      ...{
        ...(canonical && {
          alternates: {
            canonical,
          },
        }),
      },
      twitter: {
        card: "summary_large_image" as const,
      },
    };
  };

export const DEFAULT_METADATA: Metadata = {
  ...(await getMetadata()({
    params: Promise.resolve({ locale: appConfig.locale }),
  })),
  title: {
    template: SITE_NAME_TEMPLATE,
    default: env.NEXT_PUBLIC_PRODUCT_NAME,
  },
  metadataBase: appConfig.url ? new URL(appConfig.url) : null,
};

export const DEFAULT_VIEWPORT: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};
