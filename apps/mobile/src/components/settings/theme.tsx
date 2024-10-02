import { View } from "react-native";

import { hslToRgb } from "@turbostarter/shared/utils";
import { ThemeColor, themes } from "@turbostarter/ui";
import { ThemeCustomizer } from "@turbostarter/ui-mobile/theme";

import { appConfig } from "~/config/app";
import { useTheme } from "~/lib/hooks/use-theme";
import { useThemeConfig } from "~/providers/theme";

export const ThemeSettings = () => {
  const { theme, resolvedTheme, changeTheme } = useTheme();
  const [config, setConfig] = useThemeConfig();

  return (
    <View className="rounded-lg border border-border bg-card p-6 shadow-sm shadow-foreground/10">
      <ThemeCustomizer
        defaultConfig={appConfig.theme}
        config={{ ...config, mode: theme }}
        onChange={async ({ mode, ...config }) => {
          await changeTheme(mode);
          await setConfig(config);
        }}
        colors={Object.values(ThemeColor).reduce(
          (acc, color) => ({
            ...acc,
            [color]: hslToRgb(...themes[color][resolvedTheme].primary).join(
              ",",
            ),
          }),
          {} as Record<ThemeColor, string>,
        )}
      />
    </View>
  );
};
