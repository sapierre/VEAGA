import { View } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetOpenTrigger,
  BottomSheetView,
  useBottomSheet,
} from "@turbostarter/ui-mobile/bottom-sheet";
import { Button } from "@turbostarter/ui-mobile/button";
import { LocaleCustomizer, LocaleIcon } from "@turbostarter/ui-mobile/i18n";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { SettingsTile } from "~/components/settings/layout/tile";
import { useI18nConfig } from "~/providers/i18n";

export const I18nSettings = () => {
  const { t } = useTranslation("common");
  const { config, setConfig } = useI18nConfig();

  const { ref } = useBottomSheet();

  const Icon = LocaleIcon[config.locale as keyof typeof LocaleIcon];

  return (
    <BottomSheet>
      <BottomSheetOpenTrigger asChild>
        <SettingsTile icon={Icons.Languages}>
          <Text className="mr-auto">{t("language.label")}</Text>
          <Icon className="size-5" />
        </SettingsTile>
      </BottomSheetOpenTrigger>
      <BottomSheetContent ref={ref} stackBehavior="replace" name="i18n">
        <BottomSheetView className="gap-2 px-7 py-4">
          <View className="flex-row items-start">
            <View className="space-y-1 pr-2">
              <Text
                role="heading"
                aria-level={3}
                className="font-sans-medium text-2xl leading-none tracking-tight"
              >
                {t("language.label")}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {t("language.description")}
              </Text>
            </View>
          </View>

          <LocaleCustomizer onChange={(locale) => setConfig({ locale })} />

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
