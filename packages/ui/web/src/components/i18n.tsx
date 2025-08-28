"use client";

import {
  config,
  Locale,
  LocaleLabel,
  useTranslation,
} from "@turbostarter/i18n";
import { cn } from "@turbostarter/ui";

import type { Icon } from "#components/icons";

import { Icons } from "#components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/select";

export const LocaleIcon: Record<Locale, Icon> = {
  [Locale.EN]: Icons.UnitedKingdom,
  [Locale.ES]: Icons.Spain,
} as const;

interface LocaleCustomizerProps {
  readonly onChange?: (lang: Locale) => Promise<void>;
  readonly variant?: "default" | "icon";
}

export const LocaleCustomizer = ({
  onChange,
  variant = "default",
}: LocaleCustomizerProps) => {
  const { i18n } = useTranslation();
  const locale = i18n.language as Locale;

  const handleLocaleChange = async (locale: Locale) => {
    await onChange?.(locale);
    await i18n.changeLanguage(locale);
  };

  const Icon = LocaleIcon[locale];

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger
        className={cn({
          "w-full": variant === "default",
          "flex size-10 items-center justify-center rounded-full border-none p-0 text-lg transition-colors hover:bg-accent hover:text-accent-foreground [&>*:nth-child(2)]:hidden":
            variant === "icon",
        })}
      >
        {variant === "default" ? (
          <SelectValue aria-label={LocaleLabel[locale]} />
        ) : (
          <SelectValue aria-label={LocaleLabel[locale]}>
            <Icon className="size-10" />
          </SelectValue>
        )}
      </SelectTrigger>
      <SelectContent align="end">
        {config.locales.map((lang) => {
          const Icon = LocaleIcon[lang];

          return (
            <SelectItem key={lang} value={lang} className="cursor-pointer">
              <span className="flex items-center gap-2">
                <Icon className="size-4" />
                {LocaleLabel[lang]}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
