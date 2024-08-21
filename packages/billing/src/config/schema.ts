import { z } from "zod";

import {
  BillingDiscountType,
  BillingModel,
  BillingProvider,
  PricingPlanType,
  RecurringInterval,
} from "../types";

export const discountSchema = z.object({
  code: z.string(),
  type: z.nativeEnum(BillingDiscountType),
  off: z.number(),
  appliesTo: z.array(z.string()),
});

const sharedPriceSchema = z.object({
  id: z.string(),
  amount: z.number(),
});

export const priceSchema = z.discriminatedUnion("type", [
  sharedPriceSchema.extend({
    type: z.literal(BillingModel.ONE_TIME),
  }),
  sharedPriceSchema.extend({
    type: z.literal(BillingModel.RECURRING),
    interval: z.nativeEnum(RecurringInterval),
    trialDays: z.number().nullable().default(null),
  }),
]);

export const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.nativeEnum(PricingPlanType),
  badge: z.string().nullable().default(null),
  custom: z.boolean().default(false),
  prices: z.array(priceSchema),
});

export const billingConfigSchema = z.object({
  provider: z
    .nativeEnum(BillingProvider)
    .optional()
    .default(BillingProvider.STRIPE),
  model: z.nativeEnum(BillingModel).optional().default(BillingModel.RECURRING),
  currency: z.string().optional().default("usd"),
  plans: z.array(planSchema),
  discounts: z.array(discountSchema).optional().default([]),
});
