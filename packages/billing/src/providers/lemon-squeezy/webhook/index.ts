import { HttpStatusCode } from "@turbostarter/shared/constants";
import { ApiError } from "@turbostarter/shared/utils";

import { env } from "../../../env";
import { BillingProvider } from "../../../types";
import { checkoutStatusChangeHandler } from "../checkout";
import { subscriptionStatusChangeHandler } from "../subscription";

import { LEMON_SQUEEZY_SIGNATURE_HEADER, relevantEvents } from "./constants";
import { validateSignature } from "./signing";
import { webhookHasData, webhookHasMeta } from "./type-guards";

import type { WebhookCallbacks } from "../../types";

export const webhookHandler = async (
  req: Request,
  callbacks?: WebhookCallbacks,
) => {
  if (env.BILLING_PROVIDER !== BillingProvider.LEMON_SQUEEZY) {
    throw new ApiError(
      HttpStatusCode.BAD_REQUEST,
      "Unsupported billing provider!",
    );
  }

  const body = await req.text();
  const sig = req.headers.get(LEMON_SQUEEZY_SIGNATURE_HEADER);

  if (!sig) {
    throw new ApiError(
      HttpStatusCode.BAD_REQUEST,
      "Webhook signature not found.",
    );
  }

  validateSignature(sig, env.LEMON_SQUEEZY_SIGNING_SECRET, body);

  const data = JSON.parse(body);

  if (!webhookHasMeta(data)) {
    throw new ApiError(HttpStatusCode.BAD_REQUEST, "Invalid webhook meta.");
  }

  const type = data.meta.event_name;

  console.log(`🔔  Webhook received: ${type}`);

  if (!webhookHasData(data)) {
    throw new ApiError(HttpStatusCode.BAD_REQUEST, "Invalid webhook data.");
  }

  if (relevantEvents.has(type)) {
    console.log(`🔔  Relevant event: ${type}`);
    switch (type) {
      case "subscription_created":
        await callbacks?.onSubscriptionCreated?.(data.data.id);
        void subscriptionStatusChangeHandler({
          id: data.data.id,
        });
        break;
      case "subscription_updated":
        await callbacks?.onSubscriptionUpdated?.(data.data.id);
        void subscriptionStatusChangeHandler({
          id: data.data.id,
        });
        break;
      case "subscription_expired":
        await callbacks?.onSubscriptionDeleted?.(data.data.id);
        void subscriptionStatusChangeHandler({
          id: data.data.id,
        });
        break;
      case "order_created":
        await callbacks?.onCheckoutSessionCompleted?.(data.data.id);
        void checkoutStatusChangeHandler({
          id: data.data.id,
        });
        break;
      default:
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          `Unhandled relevant event: ${type}`,
        );
    }
  } else {
    throw new ApiError(
      HttpStatusCode.BAD_REQUEST,
      `Unhandled event type: ${type}`,
    );
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
