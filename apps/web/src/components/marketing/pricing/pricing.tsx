import { handle } from "@turbostarter/api/utils";
import { env } from "@turbostarter/billing/env";

import { api } from "~/lib/api/server";
import { getSession } from "~/lib/auth/server";

import { PricingSection } from "./section";

export const Pricing = async () => {
  const { user } = await getSession();

  const customer = user ? await handle(api.billing.customer.$get)() : null;

  return (
    <PricingSection
      user={user}
      customer={
        customer
          ? {
              ...customer,
              createdAt: new Date(customer.createdAt),
              updatedAt: new Date(customer.updatedAt),
            }
          : null
      }
      model={env.BILLING_MODEL}
    />
  );
};
