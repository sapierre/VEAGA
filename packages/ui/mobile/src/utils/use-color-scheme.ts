/* eslint-disable @typescript-eslint/unbound-method */
import { useColorScheme as useNativewindColorScheme } from "nativewind";

import { ThemeMode } from "@turbostarter/ui";

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();
  return {
    colorScheme: colorScheme ?? ThemeMode.DARK,
    isDarkColorScheme: colorScheme === ThemeMode.DARK,
    setColorScheme,
    toggleColorScheme,
  };
}
