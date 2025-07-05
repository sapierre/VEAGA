import { vars } from "nativewind";
import { View } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { cn, ThemeColor, themes } from "@turbostarter/ui";
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
  useBottomSheet,
} from "@turbostarter/ui-mobile/bottom-sheet";
import { Button } from "@turbostarter/ui-mobile/button";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";
import { ThemeCustomizer, MODE_ICONS } from "@turbostarter/ui-mobile/theme";

import { SettingsTile } from "~/components/settings/layout/tile";
import { appConfig } from "~/config/app";
import { useTheme } from "~/lib/hooks/use-theme";
import { useThemeConfig } from "~/providers/theme";

import type { ThemeConfig } from "@turbostarter/ui";

export const ThemeSettings = () => {
  const { t } = useTranslation("common");
  const { theme, changeTheme } = useTheme();
  const { config, setConfig } = useThemeConfig();

  const { ref } = useBottomSheet();

  const onChange = async (config: ThemeConfig) => {
    await changeTheme(config.mode);
    setConfig(config);
  };

  const colors = Object.values(ThemeColor).reduce(
    (acc, color) => {
      const [h, s, l] = themes[color].light.primary;
      return {
        ...acc,
        [color]: `${h} ${s * 100}% ${l * 100}%`,
      };
    },
    {} as Record<ThemeColor, string>,
  );

  return (
    <BottomSheet>
      <BottomSheetOpenTrigger asChild>
        <SettingsTile icon={MODE_ICONS[theme]}>
          <Text className="mr-auto">{t("theme.title")}</Text>

          <View
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white bg-primary",
            )}
            {...(colors[config.color] && {
              style: vars({
                "--color-primary": colors[config.color],
              }),
            })}
          ></View>
        </SettingsTile>
      </BottomSheetOpenTrigger>
      <BottomSheetContent ref={ref}>
        <BottomSheetView className="gap-2 px-7 py-4">
          <View className="flex-row items-start">
            <View className="space-y-1 pr-2">
              <Text
                role="heading"
                aria-level={3}
                className="font-sans-medium text-2xl leading-none tracking-tight"
              >
                {t("theme.customization.title")}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {t("theme.customization.description")}
              </Text>
            </View>

            <Button
              variant="ghost"
              size="icon"
              className="ml-auto rounded-[0.5rem]"
              onPress={() => onChange(appConfig.theme)}
            >
              <Icons.Undo2 className="text-foreground" width={20} height={20} />
            </Button>
          </View>

          <ThemeCustomizer
            config={{ ...config, mode: theme }}
            onChange={async ({ mode, ...config }) => {
              await changeTheme(mode);
              setConfig(config);
            }}
            colors={colors}
          />

          <BottomSheetCloseTrigger asChild>
            <Button>
              <Text>{t("save")}</Text>
            </Button>
          </BottomSheetCloseTrigger>
        </BottomSheetView>
      </BottomSheetContent>
    </BottomSheet>
  );
};
