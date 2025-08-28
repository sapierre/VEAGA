import { withI18n } from "@turbostarter/i18n/with-i18n";

import { Banner } from "~/components/marketing/home/banner";
import { Faq } from "~/components/marketing/home/faq";
import { Features } from "~/components/marketing/home/features";
import { Hero } from "~/components/marketing/home/hero";
import { Testimonials } from "~/components/marketing/home/testimonials";
import { Pricing } from "~/components/marketing/pricing/pricing";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <Faq />
      <Banner />
    </>
  );
};

export default withI18n(HomePage);
