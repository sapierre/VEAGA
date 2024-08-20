import { z } from "zod";

import { BillingModel, BillingProvider } from "../types";

export const billingConfigSchema = z.object({
  provider: z.nativeEnum(BillingProvider),
  model: z.nativeEnum(BillingModel),
});
