import { memo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TRPCProvider } from "~/lib/api/trpc";

import { ThemeProvider } from "./theme";

interface ProvidersProps {
  readonly children: React.ReactNode;
}

export const Providers = memo<ProvidersProps>(({ children }) => {
  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SafeAreaProvider>
    </TRPCProvider>
  );
});

Providers.displayName = "Providers";
