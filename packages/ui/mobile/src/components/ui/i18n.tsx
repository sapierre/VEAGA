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
  const { t, i18n } = useTranslation("common");
  const locale = i18n.language as Locale;

  const handleLocaleChange = async (lang: Locale) => {
    await onChange?.(lang);
    await i18n.changeLanguage(lang);
  };

  return (
    <>
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

      <View className="mt-2 flex flex-1 flex-col items-center gap-4">
        <View className="flex-row flex-wrap gap-2">
          {config.locales.map((lang) => (
            <Button
              key={lang}
              variant="outline"
              size="sm"
              onPress={() => handleLocaleChange(lang)}
              className={cn(
                "h-11 grow basis-[85px] flex-row justify-start gap-2 px-3",
                lang === locale && "border-2 border-primary",
              )}
            >
              <Text className="text-xs capitalize">
                {LocaleFlag[lang]} {LocaleLabel[lang]}
              </Text>
            </Button>
          ))}
        </View>
      </View>
    </>
  );
};
