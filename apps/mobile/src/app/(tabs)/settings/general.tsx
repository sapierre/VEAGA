import { View } from "react-native";

import { I18nSettings } from "~/components/settings/i18n";
import { ThemeSettings } from "~/components/settings/theme";

export default function General() {
  return (
    <View className="flex-1 bg-background">
      <ThemeSettings />
      <I18nSettings />
    </View>
  );
}
