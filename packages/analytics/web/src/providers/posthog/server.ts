import { PostHog } from "posthog-node";

import { env } from "../../env";
import { AnalyticsProvider } from "../../types";

import type { AllowedPropertyValues } from "../types";

let client: PostHog | null = null;

const getClient = () => {
  if (env.NEXT_PUBLIC_ANALYTICS_PROVIDER !== AnalyticsProvider.POSTHOG) {
    throw new Error("Invalid analytics provider!");
  }

  if (client) {
    return client;
  }

  client = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
  });

  return client;
};

const track = (event: string, data?: Record<string, AllowedPropertyValues>) => {
  const client = getClient();

  console.log("event", event);
  console.log("data", data);

  client.capture({
    event,
    distinctId: typeof data?.distinctId === "string" ? data.distinctId : "",
    properties: data,
  });
};

export const posthogServerStrategy = {
  track,
};
