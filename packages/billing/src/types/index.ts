import { z } from "zod";

import {
  billingStatusEnum,
  pricingPlanTypeEnum,
} from "@turbostarter/db/schema";

import type { billingConfigSchema } from "../config/schema";

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

export const BillingDiscountType = {
  PERCENT: "percent",
  AMOUNT: "amount",
} as const;

export const RecurringIntervalDuration: Record<RecurringInterval, number> = {
  [RecurringInterval.DAY]: 1,
  [RecurringInterval.WEEK]: 7,
  [RecurringInterval.MONTH]: 30,
  [RecurringInterval.YEAR]: 365,
};

export type BillingStatus = z.infer<typeof billingStatusEnumSchema>;
export type BillingProvider =
  (typeof BillingProvider)[keyof typeof BillingProvider];
export type PricingPlanType = z.infer<typeof pricingPlanTypeEnumSchema>;
export type BillingModel = (typeof BillingModel)[keyof typeof BillingModel];
export type RecurringInterval =
  (typeof RecurringInterval)[keyof typeof RecurringInterval];
export type BillingDiscountType =
  (typeof BillingDiscountType)[keyof typeof BillingDiscountType];

export type BillingConfig = z.infer<typeof billingConfigSchema>;

export interface PricingPlan {
  readonly id: string;
  readonly order: number;
  readonly name: string;
  readonly type: PricingPlanType;
  readonly badge: string | null;
  readonly description: string | null;
  readonly custom: boolean;
}

export interface PricingPlanPrice {
  readonly id: string;
  readonly amount: number;
  readonly currency: string;
  readonly recurring: {
    readonly interval: RecurringInterval;
    readonly trialDays: number | null;
  } | null;
  readonly type: BillingModel;
  readonly promotionCode: PromotionCode | null;
}

export type PricingPlanWithPrices = PricingPlan & {
  readonly prices: PricingPlanPrice[];
};

export interface Coupon {
  readonly id: string;
  readonly amountOff: number | null;
  readonly percentOff: number | null;
  readonly currency: string | null;
}

export interface PromotionCode {
  readonly id: string;
  readonly coupon: Coupon;
  readonly code: string;
  readonly maxRedemptions: number | null;
  readonly timesRedeemed: number;
}

export type { SelectCustomer as Customer } from "@turbostarter/db/schema";
