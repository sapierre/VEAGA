import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { memo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider as AnalyticsProvider } from "@turbostarter/analytics-mobile";

import { ApiProvider } from "~/lib/api";
import { I18nProvider } from "~/providers/i18n";
import { ThemeProvider } from "~/providers/theme";

interface ProvidersProps {
  readonly children: React.ReactNode;
}

export const Providers = memo<ProvidersProps>(({ children }) => {
  return (
    <GestureHandlerRootView className="flex-1" style={{ flex: 1 }}>
      <ApiProvider>
        <I18nProvider>
          <SafeAreaProvider>
            <ThemeProvider>
              <KeyboardProvider>
                <BottomSheetModalProvider>
                  <AnalyticsProvider>
                    {children}
                    <PortalHost />
                  </AnalyticsProvider>
                </BottomSheetModalProvider>
              </KeyboardProvider>
            </ThemeProvider>
          </SafeAreaProvider>
        </I18nProvider>
      </ApiProvider>
    </GestureHandlerRootView>
  );
});

Providers.displayName = "Providers";
