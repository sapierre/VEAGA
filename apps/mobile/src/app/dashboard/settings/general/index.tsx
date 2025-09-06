import { router } from "expo-router";
import { View } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { I18nSettings } from "~/components/dashboard/settings/i18n";
import { SettingsTile } from "~/components/dashboard/settings/layout/tile";
import { ThemeSettings } from "~/components/dashboard/settings/theme";
import { pathsConfig } from "~/config/paths";

export default function General() {
  const { t } = useTranslation("common");

  return (
    <View className="flex-1 bg-background py-2">
      <SettingsTile
        icon={Icons.Bell}
        onPress={() =>
          router.navigate(pathsConfig.dashboard.settings.general.notifications)
        }
      >
        <Text className="mr-auto">{t("notifications")}</Text>
      </SettingsTile>
      <ThemeSettings />
      <I18nSettings />
    </View>
  );
}
