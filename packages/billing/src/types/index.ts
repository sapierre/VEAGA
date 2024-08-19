import {
  billingStatusEnum,
  pricingPlanTypeEnum,
} from "@turbostarter/db/schema";

import { z } from "zod";
import { billingConfigSchema } from "../config/schema";

const billingStatusEnumSchema = z.enum(billingStatusEnum.enumValues);
const pricingPlanTypeEnumSchema = z.enum(pricingPlanTypeEnum.enumValues);

export const BillingStatus = billingStatusEnumSchema.enum;
export const PricingPlanType = pricingPlanTypeEnumSchema.enum;

export const BillingProvider = {
  STRIPE: "stripe",
} as const;

export const BillingModel = {
  ONE_TIME: "one-time",
  RECURRING: "recurring",
} as const;

export const RecurringInterval = {
  DAY: "day",
  MONTH: "month",
  WEEK: "week",
  YEAR: "year",
} as const;

export type BillingStatus = z.infer<typeof billingStatusEnumSchema>;
export type BillingProvider =
  (typeof BillingProvider)[keyof typeof BillingProvider];
export type PricingPlanType = z.infer<typeof pricingPlanTypeEnumSchema>;
export type BillingModel = (typeof BillingModel)[keyof typeof BillingModel];
export type RecurringInterval =
  (typeof RecurringInterval)[keyof typeof RecurringInterval];

export type BillingConfig = z.infer<typeof billingConfigSchema>;

export type PricingPlan = {
  readonly id: string;
  readonly order: number;
  readonly name: string;
  readonly type: PricingPlanType;
  readonly badge: string | null;
  readonly description: string | null;
  readonly custom: boolean;
};

export type PricingPlanPrice = {
  readonly id: string;
  readonly amount: number;
  readonly currency: string;
  readonly recurring: {
    readonly interval: RecurringInterval;
    readonly trialPeriodDays: number | null;
  } | null;
  readonly type: BillingModel;
  readonly promotionCode: PromotionCode | null;
};

export type PricingPlanWithPrices = PricingPlan & {
  readonly prices: PricingPlanPrice[];
};

export type Coupon = {
  readonly id: string;
  readonly amountOff: number | null;
  readonly percentOff: number | null;
  readonly currency: string | null;
};

export type PromotionCode = {
  readonly id: string;
  readonly coupon: Coupon;
  readonly code: string;
  readonly maxRedemptions: number | null;
  readonly timesRedeemed: number;
};

export type { SelectCustomer as Customer } from "@turbostarter/db/schema";
