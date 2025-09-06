import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import {
  Geist_400Regular,
  Geist_500Medium,
  Geist_700Bold,
  useFonts,
} from "@expo-google-fonts/geist";
import { GeistMono_400Regular } from "@expo-google-fonts/geist-mono";
import { Stack, useNavigationContainerRef } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import "~/assets/styles/globals.css";
import { useSession } from "~/lib/auth";
import { useTheme } from "~/lib/hooks/use-theme";
import "~/lib/polyfills";
import { Providers } from "~/providers/providers";

void SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(
    navigationRef as Parameters<typeof useReactNavigationDevTools>[0],
  );

  return <Stack screenOptions={{ headerShown: false }} />;
};

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    GeistMono_400Regular,
    Geist_400Regular,
    Geist_500Medium,
    Geist_700Bold,
  });

  const { isPending: sessionPending } = useSession();
  const { loaded: themeLoaded, setupTheme } = useTheme();

  const loaded = fontsLoaded && themeLoaded && !sessionPending;

  useEffect(() => {
    void setupTheme();
  }, [setupTheme]);

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootNavigator />;
};

export default function Root() {
  return (
    <Providers>
      <RootLayout />
    </Providers>
  );
}
