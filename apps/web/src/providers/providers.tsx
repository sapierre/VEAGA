import { NuqsAdapter } from "nuqs/adapters/next/app";
import { memo } from "react";

import { ApiProvider } from "~/lib/api/client";

import { AnalyticsProvider } from "./analytics";
import { ThemeProvider } from "./theme";

interface ProvidersProps {
  readonly children: React.ReactNode;
}

export const Providers = memo<ProvidersProps>(({ children }) => {
  return (
    <ApiProvider>
      <NuqsAdapter>
        <AnalyticsProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AnalyticsProvider>
      </NuqsAdapter>
    </ApiProvider>
  );
});

Providers.displayName = "Providers";
