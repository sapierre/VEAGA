import { memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ApiProvider } from "~/lib/api";

// import { Provider as AnalyticsProvider } from "@turbostarter/analytics-mobile";
import { I18nProvider } from "./i18n";
import { ThemeProvider } from "./theme";

interface ProvidersProps {
  readonly children: React.ReactNode;
}

export const Providers = memo<ProvidersProps>(({ children }) => {
  return (
    <ApiProvider>
      <I18nProvider>
        {/* <AnalyticsProvider> */}
        <SafeAreaProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SafeAreaProvider>
        {/* </AnalyticsProvider> */}
      </I18nProvider>
    </ApiProvider>
  );
});

Providers.displayName = "Providers";
