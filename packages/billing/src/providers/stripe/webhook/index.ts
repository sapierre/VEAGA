import type Stripe from "stripe";
import { STRIPE_SIGNATURE_HEADER, relevantEvents } from "./constants";
import { constructEvent } from "./event";
import { env } from "../../../env";
import { checkoutStatusChangeHandler } from "../checkout";
import { subscriptionStatusChangeHandler } from "../subscription";

export const webhookHandler = async (req: Request) => {
  const body = await req.text();
  const sig = req.headers.get(STRIPE_SIGNATURE_HEADER) as string;
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      return new Response("Webhook secret not found.", { status: 400 });
    }

    event = await constructEvent({
      payload: body,
      sig,
      secret: webhookSecret,
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
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          const subscription = event.data.object;
          await subscriptionStatusChangeHandler({
            id: subscription.id,
            customerId: subscription.customer as string,
          });
          break;
        case "checkout.session.completed":
          await checkoutStatusChangeHandler(event.data.object);
          break;
        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log(error);
      return new Response(
        "Webhook handler failed. View your Next.js function logs.",
        {
          status: 400,
        },
      );
    }
  } else {
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ received: true }));
};
