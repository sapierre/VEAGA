import { AnalyticsProvider } from "../types";

// import { googleAnalyticsStrategy } from "./google-analytics";
import { posthogStrategy } from "./posthog";

import type { AnalyticsProviderStrategy } from "./types";

export const strategies: Record<AnalyticsProvider, AnalyticsProviderStrategy> =
  {
    [AnalyticsProvider.POSTHOG]: posthogStrategy,
    [AnalyticsProvider.GOOGLE_ANALYTICS]: {} as AnalyticsProviderStrategy, // googleAnalyticsStrategy,
  };
