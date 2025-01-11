import { z } from "zod";

export const checkoutSchema = z.object({
  price: z.object({
    id: z.string(),
  }),
  redirect: z.object({
    success: z.string().url(),
    cancel: z.string().url(),
  }),
});

export const getBillingPortalSchema = z.object({
  redirectUrl: z.string().url(),
});

export type CheckoutPayload = z.infer<typeof checkoutSchema>;
export type GetBillingPortalPayload = z.infer<typeof getBillingPortalSchema>;
