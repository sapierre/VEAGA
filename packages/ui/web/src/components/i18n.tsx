"use client";

import { config, LocaleFlag, LocaleLabel } from "@turbostarter/i18n";
import { useTranslation } from "@turbostarter/i18n";

import type { Locale } from "@turbostarter/i18n";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/select";

interface LocaleCustomizerProps {
  readonly onChange?: (lang: Locale) => Promise<void>;
}

export const LocaleCustomizer = ({ onChange }: LocaleCustomizerProps) => {
  const { i18n } = useTranslation();
  const locale = i18n.language as Locale;

  const handleLocaleChange = async (locale: Locale) => {
    await onChange?.(locale);
    await i18n.changeLanguage(locale);
  };

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="flex size-10 items-center justify-center rounded-full p-0 text-lg transition-colors hover:bg-accent hover:text-accent-foreground [&>*:nth-child(2)]:hidden">
        <SelectValue>{LocaleFlag[locale]}</SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        {config.locales.map((lang) => (
          <SelectItem key={lang} value={lang} className="cursor-pointer">
            {LocaleFlag[lang]} {LocaleLabel[lang]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
