import { ApiError } from "@turbostarter/shared/utils";

import { getCustomerByCustomerId, updateCustomer } from "../../../api/customer";
import { config } from "../../../config";
import { BillingModel } from "../../../types";
import { stripe } from "../client";
import {
  createBillingPortalSession,
  createOrRetrieveCustomer,
} from "../customer";
import {
  toCheckoutBillingStatus,
  toPaymentBillingStatus,
} from "../mappers/toBillingStatus";
import { toPricingPlanType } from "../mappers/toPricingPlan";
import { subscriptionStatusChangeHandler } from "../subscription";

import type { CheckoutInput, GetBillingPortalInput } from "../../../api/schema";
import type { User } from "@turbostarter/auth";
import type Stripe from "stripe";

const createCheckoutSession = async (
  params: Stripe.Checkout.SessionCreateParams,
) => {
  try {
    return await stripe.checkout.sessions.create(params);
  } catch (e) {
    console.error(e);
    throw new ApiError(500, "Could not create checkout session.");
  }
};

const getCheckoutSession = async (sessionId: string) => {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });
  } catch (e) {
    console.error(e);
    throw new ApiError(500, "Could not retrieve checkout session.");
  }
};

export const checkoutStatusChangeHandler = async (
  session: Stripe.Checkout.Session,
) => {
  const customerId = session.customer as string | null;

  if (!customerId) {
    throw new ApiError(404, "Customer id not found.");
  }

  if (session.mode === "subscription") {
    await subscriptionStatusChangeHandler({
      id: session.subscription as string,
      customerId,
    });
    return;
  }

  const customer = await getCustomerByCustomerId(customerId);

  if (!customer) {
    throw new ApiError(404, "Customer not found.");
  }

  const checkoutSession = await getCheckoutSession(session.id);

  const product = checkoutSession.line_items?.data[0]?.price
    ?.product as Stripe.Product;

  const plan = toPricingPlanType(product.metadata.type);

  await updateCustomer(customer.userId, {
    status: checkoutSession.status
      ? toCheckoutBillingStatus(checkoutSession.status)
      : toPaymentBillingStatus(checkoutSession.payment_status),
    ...(plan && { plan }),
  });

  console.log(
    `✅ Checkout status changed for user ${customer.userId} to ${checkoutSession.status}`,
  );
};

export const checkout = async ({
  user,
  price,
  redirect,
}: CheckoutInput & { user: User }) => {
  try {
    const customer = await createOrRetrieveCustomer({
      email: user.email ?? "",
      uuid: user.id,
    });

    const session = await createCheckoutSession({
      mode:
        config.model === BillingModel.RECURRING ? "subscription" : "payment",
      billing_address_collection: "required",
      customer,
      customer_update: {
        address: "auto",
      },
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      success_url: redirect.success,
      cancel_url: redirect.cancel,
      ...(price.trialDays
        ? {
            subscription_data: {
              trial_period_days: price.trialDays,
            },
          }
        : {}),
      ...(price.promotionCode && {
        discounts: [
          {
            promotion_code: price.promotionCode.id,
          },
        ],
      }),
    });

    return { url: session.url };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      throw new ApiError(500, e.message);
    }

    throw new ApiError(500, "An unknown error occurred.");
  }
};

export const getBillingPortal = async ({
  redirectUrl,
  user,
}: GetBillingPortalInput & { user: User }) => {
  try {
    const customer = await createOrRetrieveCustomer({
      email: user.email ?? "",
      uuid: user.id,
    });

    const { url } = await createBillingPortalSession({
      customer,
      return_url: redirectUrl,
    });

    return { url };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      throw new ApiError(500, e.message);
    }

    throw new ApiError(500, "An unknown error occurred.");
  }
};
