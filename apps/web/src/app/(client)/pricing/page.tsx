import { Pricing } from "~/components/pricing/pricing";
import { api } from "~/trpc/server";
import { getMetadata } from "~/lib/metadata";

export const metadata = getMetadata({
  title: "Pricing",
});

const PricingPage = async () => {
  const { plans, config } = await api.billing.getPlans();

  return <Pricing plans={plans} config={config} />;
};

export default PricingPage;
