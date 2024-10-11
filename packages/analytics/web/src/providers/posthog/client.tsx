import dynamic from "next/dynamic";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { env } from "../../env";
import { AnalyticsProvider } from "../../types";

import type { AllowedPropertyValues } from "../types";

const PageView = dynamic(
  () => import("./page-view").then((mod) => mod.PageView),
  {
    ssr: false,
  },
);

if (
  typeof window !== "undefined" &&
  env.NEXT_PUBLIC_ANALYTICS_PROVIDER === AnalyticsProvider.POSTHOG
) {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false,
  });
}

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PostHogProvider client={posthog}>
      {children}
      <PageView />
    </PostHogProvider>
  );
};

const track = (
  event: string,
  properties?: Record<string, AllowedPropertyValues>,
) => {
  if (typeof window === "undefined") {
    return;
  }

  posthog.capture(event, properties);
};

export const posthogClientStrategy = {
  Provider,
  track,
};
