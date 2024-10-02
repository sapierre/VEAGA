import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

import { ThemeMode } from "@turbostarter/ui";
import { useColorScheme } from "@turbostarter/ui-mobile";

import { appConfig } from "~/config/app";

export const useTheme = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [loaded, setLoaded] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>(colorScheme);

  const setupTheme = useCallback(async () => {
    const storedTheme = await AsyncStorage.getItem("theme");

    if (storedTheme === ThemeMode.SYSTEM) {
      setTheme(storedTheme);
      setLoaded(true);
      return;
    }

    if (!storedTheme) {
      await AsyncStorage.setItem("theme", appConfig.theme.mode);
      setTheme(appConfig.theme.mode);
      setLoaded(true);
      return;
    }

    const colorTheme =
      storedTheme === ThemeMode.DARK ? ThemeMode.DARK : ThemeMode.LIGHT;

    if (colorTheme !== colorScheme) {
      setColorScheme(colorTheme);
      setTheme(colorTheme);
      setLoaded(true);
      return;
    }
    setLoaded(true);
  }, [colorScheme, setColorScheme]);

  const changeTheme = useCallback(
    async (theme: ThemeMode) => {
      setTheme(theme);
      setColorScheme(theme);
      await AsyncStorage.setItem("theme", theme);
    },
    [setColorScheme],
  );

  useEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  const isDark =
    theme === ThemeMode.DARK ||
    (theme === ThemeMode.SYSTEM && colorScheme === ThemeMode.DARK);

  const resolvedTheme = isDark ? ThemeMode.DARK : ThemeMode.LIGHT;

  return {
    setupTheme,
    changeTheme,
    loaded,
    theme,
    isDark,
    resolvedTheme,
  };
};
