export const Locale = {
  EN: "en",
} as const;

export type Locale = (typeof Locale)[keyof typeof Locale];

export const LocaleLabel: Record<Locale, string> = {
  [Locale.EN]: "English",
} as const;

export const LocaleFlag: Record<Locale, string> = {
  [Locale.EN]: "🇬🇧",
} as const;
