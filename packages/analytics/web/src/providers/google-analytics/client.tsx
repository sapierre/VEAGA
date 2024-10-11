/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import NextScript from "next/script";

import { env } from "../../env";
import { AnalyticsProvider } from "../../types";

import type { AllowedPropertyValues } from "../types";

const Provider = ({ children }: { children: React.ReactNode }) => {
  if (
    env.NEXT_PUBLIC_ANALYTICS_PROVIDER !== AnalyticsProvider.GOOGLE_ANALYTICS
  ) {
    return children;
  }

  return (
    <>
      {children}
      <NextScript
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
        onLoad={() => {
          if (
            typeof window === "undefined" ||
            env.NEXT_PUBLIC_ANALYTICS_PROVIDER !==
              AnalyticsProvider.GOOGLE_ANALYTICS
          ) {
            return;
          }

          (window as any).dataLayer = (window as any).dataLayer || [];

          function gtag(...rest: any[]) {
            (window as any).dataLayer.push(...rest);
          }

          (window as any).gtag = gtag;

          (window as any).gtag("js", new Date());
          (window as any).gtag(
            "config",
            env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID,
          );
        }}
      />
    </>
  );
};

const track = (event: string, data?: Record<string, AllowedPropertyValues>) => {
  if (typeof window === "undefined" || !(window as any).gtag) {
    return;
  }

  (window as any).gtag("event", event, data);
};

export const googleAnalyticsClientStrategy = {
  Provider,
  track,
};
