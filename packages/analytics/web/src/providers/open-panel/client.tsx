import { OpenPanelComponent, useOpenPanel } from "@openpanel/nextjs";

import { env } from "../../env";
import { AnalyticsProvider } from "../../types";

import type { AllowedPropertyValues } from "../types";

const Provider = ({ children }: { children: React.ReactNode }) => {
  if (env.NEXT_PUBLIC_ANALYTICS_PROVIDER !== AnalyticsProvider.OPEN_PANEL) {
    return children;
  }

  return (
    <>
      {children}
      <OpenPanelComponent
        clientId={env.NEXT_PUBLIC_OPEN_PANEL_CLIENT_ID}
        trackScreenViews
        trackAttributes
        trackOutgoingLinks
      />
    </>
  );
};

const track = (event: string, data?: Record<string, AllowedPropertyValues>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useOpenPanel().track(event, data);
};

export const openPanelClientStrategy = {
  Provider,
  track,
};
