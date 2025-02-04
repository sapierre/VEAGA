import { ScrollView, View } from "react-native";

import { AccountInfo } from "~/components/settings/account/account-info";
import { AccountSettings } from "~/components/settings/account/settings/account-settings";
import { I18nSettings } from "~/components/settings/i18n";
import { ThemeSettings } from "~/components/settings/theme";

export default function Settings() {
  return (
    <ScrollView
      className="flex-1 bg-background px-6"
      contentContainerClassName="gap-10 py-10"
    >
      <AccountInfo />
      <View className="gap-4">
        <ThemeSettings />
        <I18nSettings />
        <AccountSettings />
      </View>
    </ScrollView>
  );
}
