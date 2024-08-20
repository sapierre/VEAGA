import Stripe from "stripe";

import { env } from "../../env";
import { BillingProvider } from "../../types";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (env.BILLING_PROVIDER !== BillingProvider.STRIPE) {
  throw new Error(
    "Invalid billing provider! Please set the correct provider in the .env file.",
  );
}

export const stripe = new Stripe(env.STRIPE_SECRET_KEY);
