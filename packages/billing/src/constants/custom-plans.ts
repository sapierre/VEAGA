import {
  BillingModel,
  PricingPlanType,
  PricingPlanWithPrices,
  RecurringInterval,
} from "../types";

export const FREE_PLAN: PricingPlanWithPrices = {
  id: "starter",
  name: "Starter",
  type: PricingPlanType.FREE,
  order: 0,
  badge: null,
  description: "Start now. No credit card required",
  custom: true,
  prices: [
    {
      id: "starter-one-time",
      amount: 0,
      currency: "usd",
      recurring: null,
      type: BillingModel.ONE_TIME,
      promotionCode: null,
    },
    {
      id: "starter-monthly",
      amount: 0,
      currency: "usd",
      recurring: {
        interval: RecurringInterval.MONTH,
        trialPeriodDays: null,
      },
      type: BillingModel.RECURRING,
      promotionCode: null,
    },
    {
      id: "starter-yearly",
      amount: 0,
      currency: "usd",
      recurring: {
        interval: RecurringInterval.YEAR,
        trialPeriodDays: null,
      },
      type: BillingModel.RECURRING,
      promotionCode: null,
    },
  ],
};

export const CUSTOM_PLANS = [FREE_PLAN];
