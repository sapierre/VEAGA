"use client";

import { memo, useState } from "react";

import {
  RecurringInterval,
  RecurringIntervalDuration,
  config,
  getPriceWithHighestDiscount,
} from "@turbostarter/billing";
import { useTranslation } from "@turbostarter/i18n";
import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { Section, SectionHeader } from "~/components/common/layout/section";

import { PricingHeader } from "./layout/header";
import { Plans, PlansSkeleton } from "./plans/plans";

import type { User } from "@turbostarter/auth";
import type { BillingModel, Customer } from "@turbostarter/billing";

interface PricingSectionProps {
  readonly user: User | null;
  readonly customer: Customer | null;
  readonly model: BillingModel;
}

export const PricingSection = memo<PricingSectionProps>(
  ({ user, customer, model }) => {
    const { t } = useTranslation("billing");
    const intervals = [
      ...new Set(
        config.plans.flatMap((plan) =>
          plan.prices
            .flatMap((price) => ("interval" in price ? price.interval : null))
            .filter((x): x is RecurringInterval => !!x),
        ),
      ),
    ].sort(
      (a, b) => RecurringIntervalDuration[a] - RecurringIntervalDuration[b],
    );

    const [activeInterval, setActiveInterval] = useState<RecurringInterval>(
      intervals[0] ?? RecurringInterval.MONTH,
    );

    const priceWithDiscount = getPriceWithHighestDiscount(
      config.plans,
      config.discounts,
    );

    return (
      <Section id="pricing" className="gap-10 sm:gap-12 md:gap-16 lg:gap-20">
        <PricingHeader
          currency={t("currency")}
          model={model}
          intervals={intervals}
          activeInterval={activeInterval}
          onIntervalChange={setActiveInterval}
          {...(priceWithDiscount && { priceWithDiscount })}
        />
        <Plans
          plans={config.plans}
          interval={activeInterval}
          model={model}
          currency={t("currency")}
          discounts={config.discounts}
          user={user}
          customer={customer}
        />
      </Section>
    );
  },
);

export const PricingSectionSkeleton = () => {
  return (
    <Section id="pricing" className="gap-10 sm:gap-12 md:gap-16 lg:gap-20">
      <SectionHeader className="flex flex-col items-center justify-center gap-3">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-4 h-12 w-72" />
        <Skeleton className="h-8 w-96" />
      </SectionHeader>
      <PlansSkeleton />
    </Section>
  );
};

PricingSection.displayName = "PricingSection";
