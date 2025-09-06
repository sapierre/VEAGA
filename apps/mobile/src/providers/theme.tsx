import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { vars } from "nativewind";
import { memo } from "react";
import { StatusBar, View } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { mapValues, transform } from "@turbostarter/shared/utils";
import { themes } from "@turbostarter/ui";

import { appConfig } from "~/config/app";
import { useTheme } from "~/lib/hooks/use-theme";
import { isAndroid } from "~/utils/device";

import type { ThemeConfig } from "@turbostarter/ui";

export const useThemeConfig = create<{
  config: Omit<ThemeConfig, "mode">;
  setConfig: (config: Omit<ThemeConfig, "mode">) => void;
}>()(
  persist(
    (set) => ({
      config: appConfig.theme,
      setConfig: (config) => set({ config }),
    }),
    {
      name: "theme-config",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

interface ThemeProviderProps {
  readonly children: React.ReactNode;
}

const colors = mapValues(themes, (theme) =>
  mapValues(theme, (colors) =>
    vars(
      transform(colors, (r: Record<string, string>, [h, s, l], k) => {
        r[`--color-${k}`] = `${h} ${s * 100}% ${l * 100}%`;
      }),
    ),
  ),
);

export const ThemeProvider = memo<ThemeProviderProps>(({ children }) => {
  const { isDark, resolvedTheme } = useTheme();
  const config = useThemeConfig((state) => state.config);

  if (isAndroid) {
    void NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
  }

  return (
    <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <View
        style={colors[config.color][resolvedTheme]}
        className="flex-1 bg-background"
      >
        {children}
      </View>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        translucent
        backgroundColor="transparent"
      />
    </NavigationThemeProvider>
  );
});

ThemeProvider.displayName = "ThemeProvider";
