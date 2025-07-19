"use client";

import { View } from "react-native";

import {
  config,
  LocaleFlag,
  LocaleLabel,
  useTranslation,
} from "@turbostarter/i18n";
import { cn } from "@turbostarter/ui";

import { Button } from "./button";
import { Text } from "./text";

import type { Locale } from "@turbostarter/i18n";

interface LocaleCustomizerProps {
  readonly onChange?: (lang: Locale) => Promise<void> | void;
}

export const LocaleCustomizer = ({ onChange }: LocaleCustomizerProps) => {
  const { i18n } = useTranslation("common");
  const lang = i18n.language as Locale;

  const handleLocaleChange = async (lang: Locale) => {
    await onChange?.(lang);
    await i18n.changeLanguage(lang);
  };

  return (
    <View className="mt-2 flex flex-1 flex-col items-center gap-4">
      <View className="flex-row flex-wrap gap-2">
        {config.locales.map((locale) => (
          <Button
            key={locale}
            variant="outline"
            size="sm"
            onPress={() => handleLocaleChange(locale)}
            className={cn(
              "h-11 grow basis-[85px] flex-row justify-start gap-2 px-3",
              locale === lang && "border-2 border-primary",
            )}
          >
            <Text className="text-xs capitalize">
              {LocaleFlag[locale]} {LocaleLabel[locale]}
            </Text>
          </Button>
        ))}
      </View>
    </View>
  );
};
