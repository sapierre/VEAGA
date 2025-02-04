import { NuqsAdapter } from "nuqs/adapters/next/app";
import { memo } from "react";

import { I18nProvider } from "@turbostarter/i18n";

import { appConfig } from "~/config/app";
import { ApiProvider } from "~/lib/api/client";

import { AnalyticsProvider } from "./analytics";
import { ThemeProvider } from "./theme";

interface ProvidersProps {
  readonly children: React.ReactNode;
  readonly locale: string;
}

export const Providers = memo<ProvidersProps>(({ children, locale }) => {
  return (
    <I18nProvider locale={locale} defaultLocale={appConfig.locale}>
      <ApiProvider>
        <NuqsAdapter>
          <AnalyticsProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AnalyticsProvider>
        </NuqsAdapter>
      </ApiProvider>
    </I18nProvider>
  );
});

Providers.displayName = "Providers";
