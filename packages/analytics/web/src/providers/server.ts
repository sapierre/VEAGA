import { AnalyticsProvider } from "../types";

import { googleAnalyticsServerStrategy } from "./google-analytics/server";
import { openPanelServerStrategy } from "./open-panel/server";
import { posthogServerStrategy } from "./posthog/server";
import { vercelServerStrategy } from "./vercel/server";

import type { AnalyticsProviderServerStrategy } from "./types";

export const serverStrategies: Record<
  AnalyticsProvider,
  AnalyticsProviderServerStrategy
> = {
  [AnalyticsProvider.VERCEL]: vercelServerStrategy,
  [AnalyticsProvider.POSTHOG]: posthogServerStrategy,
  [AnalyticsProvider.OPEN_PANEL]: openPanelServerStrategy,
  [AnalyticsProvider.GOOGLE_ANALYTICS]: googleAnalyticsServerStrategy,
};
