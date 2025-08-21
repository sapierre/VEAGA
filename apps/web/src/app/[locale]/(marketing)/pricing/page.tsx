import { handle } from "@turbostarter/api/utils";
import { env } from "@turbostarter/billing/env";

import { Pricing } from "~/components/marketing/pricing/pricing";
import { api } from "~/lib/api/server";
import { getSession } from "~/lib/auth/server";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "billing:pricing.title",
  description: "billing:pricing.description",
});

const PricingPage = async () => {
  const { user } = await getSession();

  const customer = user ? await handle(api.billing.customer.$get)() : null;

  return (
    <Pricing
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

export default PricingPage;
