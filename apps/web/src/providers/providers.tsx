import { NuqsAdapter } from "nuqs/adapters/next/app";
import { memo } from "react";

import { TRPCReactProvider } from "~/lib/api/react";

import { AnalyticsProvider } from "./analytics";
import { ThemeProvider } from "./theme";

interface ProvidersProps {
  readonly children: React.ReactNode;
}

export const Providers = memo<ProvidersProps>(({ children }) => {
  return (
    <TRPCReactProvider>
      <NuqsAdapter>
        <AnalyticsProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AnalyticsProvider>
      </NuqsAdapter>
    </TRPCReactProvider>
  );
});

Providers.displayName = "Providers";
