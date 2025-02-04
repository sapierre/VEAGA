import { View } from "react-native";

import { LocaleCustomizer } from "@turbostarter/ui-mobile/i18n";

import { useI18nConfig } from "~/providers/i18n";

export const I18nSettings = () => {
  const setConfig = useI18nConfig((state) => state.setConfig);

  return (
    <View className="gap-2 rounded-lg border border-border bg-card p-6 shadow-sm shadow-foreground/10">
      <LocaleCustomizer onChange={(locale) => setConfig({ locale })} />
    </View>
  );
};
