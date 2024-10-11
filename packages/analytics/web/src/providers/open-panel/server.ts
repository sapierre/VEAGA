import { OpenPanel } from "@openpanel/nextjs";

import { env } from "../../env";
import { AnalyticsProvider } from "../../types";

import type { AllowedPropertyValues } from "../types";

let client: OpenPanel | null = null;

const getClient = () => {
  if (env.NEXT_PUBLIC_ANALYTICS_PROVIDER !== AnalyticsProvider.OPEN_PANEL) {
    throw new Error("Invalid analytics provider!");
  }

  if (client) {
    return client;
  }

  client = new OpenPanel({
    clientId: env.NEXT_PUBLIC_OPEN_PANEL_CLIENT_ID,
    clientSecret: env.OPEN_PANEL_SECRET,
  });

  return client;
};

const track = (event: string, data?: Record<string, AllowedPropertyValues>) => {
  const client = getClient();

  void client.track(event, data);
};

export const openPanelServerStrategy = {
  track,
};
