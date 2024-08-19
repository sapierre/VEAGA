import Stripe from "stripe";

import { ApiError } from "@turbostarter/shared/utils";

import { stripe } from "../client";
import { getCustomerByCustomerId, updateCustomer } from "../../../api/customer";
import {
  toCheckoutBillingStatus,
  toPaymentBillingStatus,
} from "../mappers/toBillingStatus";
import { toPricingPlanType } from "../mappers/toPricingPlan";
import { subscriptionStatusChangeHandler } from "../subscription";

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
