import { Pricing } from "~/components/pricing/pricing";
import { getMetadata } from "~/lib/metadata";
import { api } from "~/trpc/server";

export const metadata = getMetadata({
  title: "Pricing",
});

const PricingPage = async () => {
  const user = await api.user.get();

  const { plans, config } = await api.billing.getPlans();
  const customer = user ? await api.billing.getCustomer() : null;

  const sortedPlans = plans.sort((a, b) => a.order - b.order);

  return (
    <Pricing
      plans={sortedPlans}
      config={config}
      user={user}
      customer={customer}
    />
  );
};

export default PricingPage;
