import {
  Container,
  Font,
  Head,
  Html,
  Section,
  Tailwind,
} from "@react-email/components";

import { mapValues, hslToHex } from "@turbostarter/shared/utils";
import { themes } from "@turbostarter/ui";

import { env } from "../../../env";

import { Footer } from "./footer";
import { Header } from "./header";

import type { PropsWithChildren } from "react";

const colors = mapValues(themes[env.EMAIL_THEME].light, (v) => hslToHex(...v));

export const Layout = ({
  children,
  siteUrl,
}: PropsWithChildren<{ siteUrl: string }>) => {
  return (
    <Html lang="en">
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
        <Section className="p-1">
          <Container className="rounded-lg bg-card p-6 text-card-foreground">
            <Header siteUrl={siteUrl} />
            {children}
            <Footer siteUrl={siteUrl} />
          </Container>
        </Section>
      </Tailwind>
    </Html>
  );
};
