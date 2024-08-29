import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { THEME_MODE } from "@turbostarter/ui";
import { useColorScheme } from "@turbostarter/ui-mobile";

export const useSetupTheme = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    void (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (!theme) {
        await AsyncStorage.setItem("theme", colorScheme);
        setLoaded(true);
        return;
      }
      const colorTheme =
        theme === THEME_MODE.DARK ? THEME_MODE.DARK : THEME_MODE.LIGHT;

      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setLoaded(true);
        return;
      }
      setLoaded(true);
    })();
  }, [colorScheme, setColorScheme]);

  return loaded;
};
