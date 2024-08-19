import { ApiError } from "@turbostarter/shared/utils";
import { getCustomerByCustomerId, updateCustomer } from "../../../api/customer";
import Stripe from "stripe";
import { toBillingStatus } from "../mappers/toBillingStatus";
import { stripe } from "../client";
import {
  toPricingPlan,
  toPricingPlanPrice,
  toPricingPlanType,
} from "../mappers/toPricingPlan";
import { PricingPlanPrice, PricingPlanWithPrices } from "../../../types";
import { CUSTOM_PLANS } from "../../../constants";
import { config } from "../../../config";

const getSubscription = async (subscriptionId: string) => {
  return stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method", "plan.product"],
  }) as Promise<Stripe.Response<Stripe.Subscription & { plan: Stripe.Plan }>>;
};

export const getPlans = async () => {
  const prices = await stripe.prices.list({
    active: true,
    expand: ["data.product"],
  });

  const codes = await getPromotionCodes();

  const products = prices.data.reduce(
    (acc, price) => {
      const product = price.product as Stripe.Product;

      if (!acc[product.id]) {
        acc[product.id] = {
          ...product,
          prices: [],
        };
      }

      const code = codes.data.find((c) =>
        c.coupon.applies_to?.products.includes(product.id),
      );

      acc[product.id]?.prices.push(toPricingPlanPrice(price, code));

      return acc;
    },
    {} as Record<string, Stripe.Product & { prices: PricingPlanPrice[] }>,
  );

  const filteredProducts = Object.values(products)
    .map((product) => ({
      ...toPricingPlan(product),
      prices: product.prices.filter((price) => price.type === config.model),
    }))
    .filter((x): x is PricingPlanWithPrices => !!x);

  return [...CUSTOM_PLANS, ...filteredProducts];
};

export const getPromotionCodes = async () => {
  return stripe.promotionCodes.list({
    active: true,
    expand: ["data.coupon.applies_to"],
  });
};

export const subscriptionStatusChangeHandler = async ({
  id,
  customerId,
}: {
  id: string;
  customerId: string;
}) => {
  const customer = await getCustomerByCustomerId(customerId);

  if (!customer) {
    throw new ApiError(404, "Customer not found.");
  }

  const subscription = await getSubscription(id);
  const product = subscription.plan.product as Stripe.Product;

  const plan = toPricingPlanType(product.metadata.type);

  await updateCustomer(customer.userId, {
    status: toBillingStatus(subscription.status),
    ...(plan && { plan }),
  });

  console.log(
    `✅ Subscription status changed for user ${customer.userId} to ${subscription.status}`,
  );
};
