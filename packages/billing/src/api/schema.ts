import { z } from "zod";

export const checkoutSchema = z.object({
  price: z.object({
    id: z.string(),
    promotionCode: z
      .object({
        id: z.string(),
      })
      .nullable()
      .optional(),
    trialDays: z.number().optional(),
  }),
  redirect: z.object({
    success: z.string().url(),
    cancel: z.string().url(),
  }),
});

export const getBillingPortalSchema = z.object({
  redirectUrl: z.string().url(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type GetBillingPortalInput = z.infer<typeof getBillingPortalSchema>;
