export const AnalyticsProvider = {
  POSTHOG: "posthog",
  GOOGLE_ANALYTICS: "google-analytics",
} as const;

export type AnalyticsProvider =
  (typeof AnalyticsProvider)[keyof typeof AnalyticsProvider];
