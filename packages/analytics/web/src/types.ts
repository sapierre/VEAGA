export const AnalyticsProvider = {
  VERCEL: "vercel",
  POSTHOG: "posthog",
  GOOGLE_ANALYTICS: "google-analytics",
  OPEN_PANEL: "open-panel",
} as const;

export type AnalyticsProvider =
  (typeof AnalyticsProvider)[keyof typeof AnalyticsProvider];
