import { AnalyticsProvider } from "../types";

import { googleAnalyticsClientStrategy } from "./google-analytics/client";
import { openPanelClientStrategy } from "./open-panel/client";
import { posthogClientStrategy } from "./posthog/client";
import { vercelClientStrategy } from "./vercel/client";

import type { AnalyticsProviderClientStrategy } from "./types";

export const clientStrategies: Record<
  AnalyticsProvider,
  AnalyticsProviderClientStrategy
> = {
  [AnalyticsProvider.VERCEL]: vercelClientStrategy,
  [AnalyticsProvider.POSTHOG]: posthogClientStrategy,
  [AnalyticsProvider.OPEN_PANEL]: openPanelClientStrategy,
  [AnalyticsProvider.GOOGLE_ANALYTICS]: googleAnalyticsClientStrategy,
};
