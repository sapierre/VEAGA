import { HttpStatusCode } from "@turbostarter/shared/constants";
import { ApiError } from "@turbostarter/shared/utils";

import { env } from "../../../env";
import { BillingProvider } from "../../../types";
import { checkoutStatusChangeHandler } from "../checkout";
import { subscriptionStatusChangeHandler } from "../subscription";

import { STRIPE_SIGNATURE_HEADER, relevantEvents } from "./constants";
import { constructEvent } from "./event";

import type { WebhookCallbacks } from "../../types";

export const webhookHandler = async (
  req: Request,
  callbacks?: WebhookCallbacks,
) => {
  if (env.BILLING_PROVIDER !== BillingProvider.STRIPE) {
    throw new ApiError(
      HttpStatusCode.BAD_REQUEST,
      "Unsupported billing provider!",
    );
  }

  const body = await req.text();
  const sig = req.headers.get(STRIPE_SIGNATURE_HEADER);

  if (!sig) {
    throw new ApiError(
      HttpStatusCode.BAD_REQUEST,
      "Webhook signature not found.",
    );
  }

  const event = constructEvent({
    payload: body,
    sig,
    secret: env.STRIPE_WEBHOOK_SECRET,
  });
  console.log(`🔔  Webhook received: ${event.type}`);

  if (relevantEvents.has(event.type)) {
    console.log(`🔔  Relevant event: ${event.type}`);

    switch (event.type) {
      case "customer.subscription.created":
        await callbacks?.onSubscriptionCreated?.(event.data.object.id);
        void subscriptionStatusChangeHandler({
          id: event.data.object.id,
          customerId: event.data.object.customer as string,
        });
        break;
      case "customer.subscription.updated":
        await callbacks?.onSubscriptionUpdated?.(event.data.object.id);
        void subscriptionStatusChangeHandler({
          id: event.data.object.id,
          customerId: event.data.object.customer as string,
        });
        break;
      case "customer.subscription.deleted":
        await callbacks?.onSubscriptionDeleted?.(event.data.object.id);
        void subscriptionStatusChangeHandler({
          id: event.data.object.id,
          customerId: event.data.object.customer as string,
        });
        break;
      case "checkout.session.completed":
        await callbacks?.onCheckoutSessionCompleted?.(event.data.object.id);
        void checkoutStatusChangeHandler(event.data.object);
        break;
      default:
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          `Unsupported event type: ${event.type}`,
        );
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
