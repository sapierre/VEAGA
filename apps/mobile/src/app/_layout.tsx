import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { DMMono_400Regular } from "@expo-google-fonts/dm-mono";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_400Regular_Italic,
  DMSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dm-sans";
import * as Application from "expo-application";
import { Stack } from "expo-router";
import { useNavigationContainerRef } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";

import "~/assets/styles/globals.css";
import { Header } from "~/components/common/layout/header";
import { useTheme } from "~/lib/hooks/use-theme";
import "~/lib/polyfills";
import { Providers } from "~/providers/providers";

void SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

const RootLayoutNav = () => {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(
    navigationRef as Parameters<typeof useReactNavigationDevTools>[0],
  );

  return (
    <Providers>
      <Stack
        screenOptions={{
          header: () => <Header title={Application.applicationName ?? ""} />,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
    </Providers>
  );
};

const RootLayout = () => {
  const [fontsLoaded, fontsError] = useFonts({
    DMMono_400Regular,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_400Regular_Italic,
    DMSans_700Bold,
  });

  const { loaded: themeLoaded, setupTheme } = useTheme();

  const loaded = fontsLoaded && themeLoaded;
  const error = fontsError;

  useEffect(() => {
    void setupTheme();
  }, [setupTheme]);

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <RootLayoutNav />;
};

export default RootLayout;
