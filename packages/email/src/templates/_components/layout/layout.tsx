import {
  Container,
  Font,
  Head,
  Html,
  Section,
  Tailwind,
} from "@react-email/components";

import { I18nProvider } from "@turbostarter/i18n";
import { mapValues, hslToHex } from "@turbostarter/shared/utils";
import { themes } from "@turbostarter/ui";

import { theme } from "../../../env";

import { Footer } from "./footer";
import { Header } from "./header";

import type { PropsWithChildren } from "react";

const colors = mapValues(themes[theme].light, (v) => hslToHex(...v));

export const Layout = ({
  children,
  origin,
  locale,
}: PropsWithChildren<{ origin?: string; locale?: string }>) => {
  return (
    <Html lang={locale}>
      <Head>
        <Font
          fontFamily="DM Sans"
          fallbackFontFamily="Arial"
          fontWeight={400}
          fontStyle="normal"
          webFont={{
            url: "https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZOIHTWEBlw.woff2",
            format: "woff2",
          }}
        />
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                border: colors.border,
                input: colors.input,
                ring: colors.ring,
                background: colors.background,
                foreground: colors.foreground,
                primary: {
                  DEFAULT: colors.primary,
                  foreground: colors["primary-foreground"],
                },
                secondary: {
                  DEFAULT: colors.secondary,
                  foreground: colors["secondary-foreground"],
                },
                success: {
                  DEFAULT: colors.success,
                  foreground: colors["success-foreground"],
                },
                destructive: {
                  DEFAULT: colors.destructive,
                  foreground: colors["destructive-foreground"],
                },
                muted: {
                  DEFAULT: colors.muted,
                  foreground: colors["muted-foreground"],
                },
                accent: {
                  DEFAULT: colors.accent,
                  foreground: colors["accent-foreground"],
                },
                popover: {
                  DEFAULT: colors.popover,
                  foreground: colors["popover-foreground"],
                },
                card: {
                  DEFAULT: colors.card,
                  foreground: colors["card-foreground"],
                },
              },
            },
          },
        }}
      >
        <I18nProvider locale={locale}>
          <Section className="p-1">
            <Container className="rounded-lg bg-card p-6 text-card-foreground">
              {origin && <Header origin={origin} />}
              {children}
              {origin && <Footer origin={origin} />}
            </Container>
          </Section>
        </I18nProvider>
      </Tailwind>
    </Html>
  );
};
