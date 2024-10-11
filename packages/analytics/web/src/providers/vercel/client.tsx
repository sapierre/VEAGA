import { track } from "@vercel/analytics";
import { Analytics } from "@vercel/analytics/react";

import { env } from "../../env";
import { AnalyticsProvider } from "../../types";

const Provider = ({ children }: { children: React.ReactNode }) => {
  if (env.NEXT_PUBLIC_ANALYTICS_PROVIDER !== AnalyticsProvider.VERCEL) {
    return children;
  }

  return (
    <>
      <Analytics />
      {children}
    </>
  );
};

export const vercelClientStrategy = {
  Provider,
  track,
};
