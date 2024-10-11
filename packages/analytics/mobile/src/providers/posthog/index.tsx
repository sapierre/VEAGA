import PostHog, { PostHogProvider } from "posthog-react-native";
import { useEffect } from "react";

import { env } from "../../env";
import { useTrackingPermissions } from "../../hooks";
import { AnalyticsProvider } from "../../types";

import type { AllowedPropertyValues } from "../types";

let client: PostHog | null = null;

const getClient = () => {
  if (env.EXPO_PUBLIC_ANALYTICS_PROVIDER !== AnalyticsProvider.POSTHOG) {
    return null;
  }

  if (client) {
    return client;
  }

  client = new PostHog(env.EXPO_PUBLIC_POSTHOG_KEY, {
    host: env.EXPO_PUBLIC_POSTHOG_HOST,
    defaultOptIn: false,
  });

  return client;
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = getClient();

  if (!client) {
    return children;
  }

  return (
    <PostHogProvider client={client} autocapture>
      {children}
    </PostHogProvider>
  );
};

const Setup = () => {
  const client = getClient();
  const granted = useTrackingPermissions();

  useEffect(() => {
    const optedOut = client?.optedOut;
    if (granted && optedOut) {
      void client.optIn();
    }
  }, [granted, client]);

  return null;
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <Setup />
      {children}
    </Wrapper>
  );
};

const track = (
  name: string,
  params?: Record<string, AllowedPropertyValues>,
) => {
  const client = getClient();

  if (!client) {
    return;
  }

  client.capture(name, params);
};

export const posthogStrategy = {
  Provider,
  track,
};
