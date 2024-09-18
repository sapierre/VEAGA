import { env } from "../../../env";
import { BillingProvider } from "../../../types";
import { checkoutStatusChangeHandler } from "../checkout";
import { subscriptionStatusChangeHandler } from "../subscription";

import { STRIPE_SIGNATURE_HEADER, relevantEvents } from "./constants";
import { constructEvent } from "./event";

import type { WebhookCallbacks } from "../../types";
import type Stripe from "stripe";

export const webhookHandler = async (
  req: Request,
  callbacks?: WebhookCallbacks,
) => {
  if (env.BILLING_PROVIDER !== BillingProvider.STRIPE) {
    return new Response("Unsupported billing provider!", { status: 400 });
  }

  const body = await req.text();
  const sig = req.headers.get(STRIPE_SIGNATURE_HEADER);
  let event: Stripe.Event;

  try {
    if (!sig) {
      return new Response("Webhook signature not found.", { status: 400 });
    }

    event = constructEvent({
      payload: body,
      sig,
      secret: env.STRIPE_WEBHOOK_SECRET,
    });
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err: unknown) {
    let message = "Unknown webhook error";
    if (err instanceof Error) {
      message = err.message;
    }

    console.log(`❌ Error message: ${message}`);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    console.log(`🔔  Relevant event: ${event.type}`);

    try {
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
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log(error);
      return new Response("Webhook handler failed. View your function logs.", {
        status: 400,
      });
    }
  } else {
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ received: true }));
};
