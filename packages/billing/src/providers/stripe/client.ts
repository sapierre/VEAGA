import Stripe from "stripe";
import { env } from "../../env";
import { BillingProvider } from "../../types";

if (env.BILLING_PROVIDER !== BillingProvider.STRIPE) {
  throw new Error(
    "Invalid billing provider! Please set the correct provider in the .env file.",
  );
}

export const stripe = new Stripe(env.STRIPE_SECRET_KEY);
