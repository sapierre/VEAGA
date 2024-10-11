import { AnalyticsProvider } from "../types";

import { googleAnalyticsStrategy } from "./google-analytics";

import type { AnalyticsProviderStrategy } from "./types";

export const strategies: Record<AnalyticsProvider, AnalyticsProviderStrategy> =
  {
    [AnalyticsProvider.GOOGLE_ANALYTICS]: googleAnalyticsStrategy,
  };
