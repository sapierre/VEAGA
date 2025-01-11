import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { vars } from "nativewind";
import { memo } from "react";
import { View } from "react-native";

import { mapValues, transform } from "@turbostarter/shared/utils";
import { themes } from "@turbostarter/ui";

import { appConfig } from "~/config/app";
import { useTheme } from "~/lib/hooks/use-theme";
import { isAndroid } from "~/utils/device";

import type { ThemeConfig } from "@turbostarter/ui";

type Storage = Omit<ThemeConfig, "mode">;

const storage = createJSONStorage<Storage>(() => AsyncStorage);

const configAtom = atomWithStorage<Storage>("config", appConfig.theme, storage);

export function useThemeConfig() {
  return useAtom(configAtom);
}

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
  const [config] = useThemeConfig();

  if (isAndroid) {
    void NavigationBar.setPositionAsync("absolute");
    void NavigationBar.setBackgroundColorAsync("transparent");
    void NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
  }

  return (
    <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <View style={colors[config.color][resolvedTheme]} className="flex-1">
        {children}
      </View>
    </NavigationThemeProvider>
  );
});

ThemeProvider.displayName = "ThemeProvider";
