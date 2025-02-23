import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { memo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
    <GestureHandlerRootView className="flex-1" style={{ flex: 1 }}>
      <ApiProvider>
        <I18nProvider>
          {/* <AnalyticsProvider> */}
          <SafeAreaProvider>
            <ThemeProvider>
              <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
            </ThemeProvider>
          </SafeAreaProvider>
          {/* </AnalyticsProvider> */}
        </I18nProvider>
      </ApiProvider>
    </GestureHandlerRootView>
  );
});

Providers.displayName = "Providers";
