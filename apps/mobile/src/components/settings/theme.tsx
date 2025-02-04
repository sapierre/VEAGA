import { View } from "react-native";

import { ThemeColor, themes } from "@turbostarter/ui";
import { ThemeCustomizer } from "@turbostarter/ui-mobile/theme";

import { appConfig } from "~/config/app";
import { useTheme } from "~/lib/hooks/use-theme";
import { useThemeConfig } from "~/providers/theme";

export const ThemeSettings = () => {
  const { theme, changeTheme } = useTheme();
  const { config, setConfig } = useThemeConfig();

  return (
    <View className="rounded-lg border border-border bg-card p-6 shadow-sm shadow-foreground/10">
      <ThemeCustomizer
        defaultConfig={appConfig.theme}
        config={{ ...config, mode: theme }}
        onChange={async ({ mode, ...config }) => {
          await changeTheme(mode);
          setConfig(config);
        }}
        colors={Object.values(ThemeColor).reduce(
          (acc, color) => {
            const [h, s, l] = themes[color].light.primary;
            return {
              ...acc,
              [color]: `${h} ${s * 100}% ${l * 100}%`,
            };
          },
          {} as Record<ThemeColor, string>,
        )}
      />
    </View>
  );
};
