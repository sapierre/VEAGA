import { memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// import { Provider as AnalyticsProvider } from "@turbostarter/analytics-mobile";

import { ApiProvider } from "~/lib/api";

import { ThemeProvider } from "./theme";

interface ProvidersProps {
  readonly children: React.ReactNode;
}

export const Providers = memo<ProvidersProps>(({ children }) => {
  return (
    <ApiProvider>
      {/* <AnalyticsProvider> */}
      <SafeAreaProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SafeAreaProvider>
      {/* </AnalyticsProvider> */}
    </ApiProvider>
  );
});

Providers.displayName = "Providers";
