import { getTranslation } from "@turbostarter/i18n/server";
import { cn } from "@turbostarter/ui";
import { buttonVariants } from "@turbostarter/ui-web/button";

import { CtaButton } from "~/components/common/layout/cta-button";
import { Section } from "~/components/common/layout/section";

export const Banner = async () => {
  const { t } = await getTranslation({ ns: "marketing" });
  return (
    <Section
      id="banner"
      className="!max-w-full gap-4 bg-primary text-primary-foreground sm:gap-6 md:gap-8 lg:gap-10"
    >
      <h3 className="text-balance text-3xl font-semibold leading-[0.95] tracking-tighter md:text-4xl lg:text-5xl">
        {t("cta.question")}
      </h3>
      <CtaButton className={cn(buttonVariants({ variant: "secondary" }))} />
    </Section>
  );
};
