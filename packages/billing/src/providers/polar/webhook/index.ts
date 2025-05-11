import {
  validateEvent,
  WebhookVerificationError,
} from "@polar-sh/sdk/webhooks";

import { HttpStatusCode } from "@turbostarter/shared/constants";
import { HttpException } from "@turbostarter/shared/utils";

import { env } from "../../../env";
import { BillingProvider } from "../../../types";
import { checkoutStatusChangeHandler } from "../checkout";
import { subscriptionStatusChangeHandler } from "../subscription";

import { relevantEvents } from "./constants";

import type { WebhookCallbacks } from "../../types";

export const webhookHandler = async (
  req: Request,
  callbacks?: WebhookCallbacks,
) => {
  if (env.BILLING_PROVIDER !== BillingProvider.POLAR) {
    throw new HttpException(HttpStatusCode.BAD_REQUEST, {
      code: "billing:error.unsupportedProvider",
    });
  }

  try {
    const raw = await req.text();

    const event = validateEvent(
      raw,
      Object.fromEntries(req.headers.entries()),
      env.POLAR_WEBHOOK_SECRET,
    );

    const type = event.type;

    console.log(`🔔  Webhook received: ${type}`);

    if (!type) {
      throw new HttpException(HttpStatusCode.BAD_REQUEST, {
        code: "billing:error.webhook.dataInvalid",
      });
    }

    if (relevantEvents.has(type)) {
      console.log(`🔔  Relevant event: ${type}`);
      switch (type) {
        case "subscription.created":
          await callbacks?.onSubscriptionCreated?.(event.data.id);
          void subscriptionStatusChangeHandler({
            id: event.data.id,
          });
          break;
        case "subscription.updated":
          await callbacks?.onSubscriptionUpdated?.(event.data.id);
          void subscriptionStatusChangeHandler({
            id: event.data.id,
          });
          break;
        case "subscription.canceled":
        case "subscription.revoked":
          await callbacks?.onSubscriptionDeleted?.(event.data.id);
          void subscriptionStatusChangeHandler({
            id: event.data.id,
          });
          break;
        case "order.created":
          await callbacks?.onCheckoutSessionCompleted?.(event.data.id);
          void checkoutStatusChangeHandler({
            id: event.data.id,
          });
          break;
        default:
          throw new HttpException(HttpStatusCode.BAD_REQUEST, {
            code: "billing:error.webhook.unhandledEvent",
          });
      }
    } else {
      throw new HttpException(HttpStatusCode.BAD_REQUEST, {
        code: "billing:error.webhook.unsupportedEvent",
      });
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      throw new HttpException(HttpStatusCode.BAD_REQUEST, {
        code: "billing:error.webhook.invalidSignature",
      });
    }
    throw new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
};
