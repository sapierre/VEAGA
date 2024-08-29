import * as Application from "expo-application";
import { Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Header } from "~/components/common/layout/header";
import { TABS_PREFIX } from "~/config/paths";
import "~/styles/globals.css";
import * as NavigationBar from "expo-navigation-bar";
import { isAndroid } from "~/utils/device";
import { TRPCProvider } from "~/lib/api/trpc";

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();

  if (isAndroid) {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("transparent");
    NavigationBar.setButtonStyleAsync(
      colorScheme === "dark" ? "light" : "dark",
    );
  }

  return (
    <TRPCProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name={TABS_PREFIX} options={{ headerShown: false }} />

            <Stack.Screen
              name="index"
              options={{
                header: () => (
                  <Header title={Application.applicationName ?? ""} />
                ),
              }}
            />
          </Stack>
          <StatusBar barStyle="light-content" />
        </SafeAreaProvider>
      </ThemeProvider>
    </TRPCProvider>
  );
};

const RootLayout = () => {
  return <RootLayoutNav />;
};

export default RootLayout;
