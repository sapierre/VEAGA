import {
  BillingModel,
  PricingPlanType,
  RecurringInterval,
  BillingDiscountType,
} from "../types";

import type { PricingPlan, Discount } from "../types";

export const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Start now. No credit card required",
    type: PricingPlanType.FREE,
    badge: null,
    custom: true,
    prices: [
      {
        id: "starter-lifetime",
        amount: 0,
        type: BillingModel.ONE_TIME,
      },
      {
        id: "starter-monthly",
        amount: 0,
        interval: RecurringInterval.MONTH,
        trialDays: null,
        type: BillingModel.RECURRING,
      },
      {
        id: "starter-yearly",
        amount: 0,
        interval: RecurringInterval.YEAR,
        trialDays: null,
        type: BillingModel.RECURRING,
      },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Become a power user and gain benefits",
    type: PricingPlanType.PREMIUM,
    badge: "Bestseller",
    custom: false,
    prices: [
      {
        id: "price_1PpUagFQH4McJDTlHCzOmyT6",
        amount: 29900,
        type: BillingModel.ONE_TIME,
      },
      {
        id: "price_1PpZAAFQH4McJDTlig6FBPyy",
        amount: 1900,
        interval: RecurringInterval.MONTH,
        trialDays: 7,
        type: BillingModel.RECURRING,
      },
      {
        id: "price_1PpZALFQH4McJDTl8SWorWTO",
        amount: 8900,
        interval: RecurringInterval.YEAR,
        trialDays: 7,
        type: BillingModel.RECURRING,
      },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Designed for organizations and big teams",
    type: PricingPlanType.ENTERPRISE,
    badge: null,
    custom: true,
    prices: [
      {
        id: "price_1PpZ7qFQH4McJDTlAKYW6UxF",
        amount: 99900,
        type: BillingModel.ONE_TIME,
      },
      {
        id: "price_1PpZ9CFQH4McJDTlPx9Vrurg",
        amount: 5900,
        interval: RecurringInterval.MONTH,
        trialDays: null,
        type: BillingModel.RECURRING,
      },
      {
        id: "price_1PpZ9QFQH4McJDTlTZVUIC8v",
        amount: 19900,
        interval: RecurringInterval.YEAR,
        trialDays: null,
        type: BillingModel.RECURRING,
      },
    ],
  },
];

export const discounts: Discount[] = [
  {
    code: "50OFF",
    type: BillingDiscountType.PERCENT,
    off: 50,
    appliesTo: [
      "price_1PpUagFQH4McJDTlHCzOmyT6",
      "price_1PpZAAFQH4McJDTlig6FBPyy",
      "price_1PpZALFQH4McJDTl8SWorWTO",
    ],
  },
];
