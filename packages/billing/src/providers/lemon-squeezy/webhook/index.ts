import { handleApiError } from "@turbostarter/shared/utils";

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
    return new Response("Unsupported billing provider!", { status: 400 });
  }

  const body = await req.text();
  const sig = req.headers.get(LEMON_SQUEEZY_SIGNATURE_HEADER);

  try {
    if (!sig) {
      return new Response("Webhook signature not found.", { status: 400 });
    }

    validateSignature(sig, env.LEMON_SQUEEZY_SIGNING_SECRET, body);

    const data = JSON.parse(body);

    if (!webhookHasMeta(data)) {
      return new Response("Invalid webhook data.", { status: 400 });
    }

    const type = data.meta.event_name;

    console.log(`🔔  Webhook received: ${type}`);

    if (!webhookHasData(data)) {
      return new Response("Invalid webhook data.", { status: 400 });
    }

    if (relevantEvents.has(type)) {
      console.log(`🔔  Relevant event: ${type}`);
      try {
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
            throw new Error("Unhandled relevant event!");
        }
      } catch (error) {
        return handleApiError(error);
      }
    } else {
      return new Response(`Unsupported event type: ${type}`, {
        status: 400,
      });
    }
  } catch (error) {
    return handleApiError(error);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
