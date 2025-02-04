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

import { PricingHeader } from "./layout/header";
import { Plans, PlansSkeleton } from "./plans/plans";

import type { User } from "@turbostarter/auth";
import type { BillingModel, Customer } from "@turbostarter/billing";

interface PricingProps {
  readonly user: User | null;
  readonly customer: Customer | null;
  readonly model: BillingModel;
}

export const Pricing = memo<PricingProps>(({ user, customer, model }) => {
  const { t } = useTranslation("billing");
  const intervals = [
    ...new Set(
      config.plans.flatMap((plan) =>
        plan.prices
          .flatMap((price) => ("interval" in price ? price.interval : null))
          .filter((x): x is RecurringInterval => !!x),
      ),
    ),
  ].sort((a, b) => RecurringIntervalDuration[a] - RecurringIntervalDuration[b]);

  const [activeInterval, setActiveInterval] = useState<RecurringInterval>(
    intervals[0] ?? RecurringInterval.MONTH,
  );

  const priceWithDiscount = getPriceWithHighestDiscount(
    config.plans,
    config.discounts,
  );

  return (
    <div className="flex w-full flex-col items-center justify-start gap-14 lg:gap-24">
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
    </div>
  );
});

export const PricingSkeleton = () => {
  return (
    <div className="mt-2 flex w-full flex-col items-center justify-start gap-14 pb-16 lg:gap-24 lg:pb-28">
      <div className="flex flex-col items-center justify-center gap-3">
        <Skeleton className="h-12 w-72" />
        <Skeleton className="h-8 w-96" />
      </div>
      <PlansSkeleton />
    </div>
  );
};

Pricing.displayName = "Pricing";
