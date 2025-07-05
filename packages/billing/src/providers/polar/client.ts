import { Polar } from "@polar-sh/sdk";

import { NodeEnv } from "@turbostarter/shared/constants";

import { env } from "../../env";
import { BillingProvider } from "../../types";

let polarInstance: Polar | null = null;

export const polar = () => {
  if (env.BILLING_PROVIDER !== BillingProvider.POLAR) {
    throw new Error("Invalid billing provider!");
  }

  polarInstance ??= new Polar({
    server: env.NODE_ENV === NodeEnv.PRODUCTION ? "production" : "sandbox",
    accessToken: env.POLAR_ACCESS_TOKEN,
  });

  return polarInstance;
};
