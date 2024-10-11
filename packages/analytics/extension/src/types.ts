export const AnalyticsProvider = {
  GOOGLE_ANALYTICS: "google-analytics",
} as const;

export type AnalyticsProvider =
  (typeof AnalyticsProvider)[keyof typeof AnalyticsProvider];
