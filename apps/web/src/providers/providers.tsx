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
      <AnalyticsProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AnalyticsProvider>
    </TRPCReactProvider>
  );
});

Providers.displayName = "Providers";
