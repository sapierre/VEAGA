import { BillingModel, PricingPlanType } from "../../../types";

import { toPromotionCode } from "./toCoupon";

import type { PricingPlan, PricingPlanPrice } from "../../../types";
import type Stripe from "stripe";

export const toPricingPlanType = (
  input: string | undefined,
): PricingPlanType | null => {
  const type = Object.values(PricingPlanType).find((type) => type === input);

  if (!type) {
    return null;
  }

  return type;
};

export const toPricingPlan = (product: Stripe.Product): PricingPlan | null => {
  const type = toPricingPlanType(product.metadata.type);

  if (!type) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    type,
    order: product.metadata.order
      ? parseInt(product.metadata.order, 10)
      : 10000,
    badge: product.metadata.badge ?? null,
    description: product.description,
    custom: false,
  };
};

export const toPricingPlanPrice = (
  price: Stripe.Price,
  code?: Stripe.PromotionCode,
): PricingPlanPrice => {
  return {
    id: price.id,
    amount: price.unit_amount ?? 0,
    currency: price.currency,
    type: toPricingPlanPriceType(price.type),
    recurring: price.recurring
      ? {
          interval: price.recurring.interval,
          trialDays:
            price.recurring.trial_period_days ??
            (price.metadata.trial && !isNaN(Number(price.metadata.trial))
              ? Number(price.metadata.trial)
              : null),
        }
      : null,
    promotionCode: code ? toPromotionCode(code) : null,
  };
};

const toPricingPlanPriceType = (type: Stripe.Price.Type): BillingModel => {
  switch (type) {
    case "one_time":
      return BillingModel.ONE_TIME;
    case "recurring":
      return BillingModel.RECURRING;
    default:
      throw new Error(`Invalid payment billing model: ${type as string}`);
  }
};
