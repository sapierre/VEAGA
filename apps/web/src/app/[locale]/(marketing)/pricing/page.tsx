import { Pricing } from "~/components/marketing/pricing/pricing";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "billing:pricing.label",
  description: "billing:pricing.description",
});

const PricingPage = () => {
  return <Pricing />;
};

export default PricingPage;
