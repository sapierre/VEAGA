import Stripe from "stripe";
import { toPromotionCode } from "./toCoupon";
import {
  BillingModel,
  PricingPlan,
  PricingPlanPrice,
  PricingPlanType,
} from "../../../types";

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
          trialPeriodDays: price.recurring.trial_period_days,
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
      throw new Error(`Invalid payment billing model: ${type}`);
  }
};
