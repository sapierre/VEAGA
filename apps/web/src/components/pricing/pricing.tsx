"use client";

import { memo, useState } from "react";

import {
  RecurringInterval,
  RecurringIntervalDuration,
  getPriceWithHighestDiscount,
} from "@turbostarter/billing";
import { Skeleton } from "@turbostarter/ui/web";

import { PricingFooter } from "./layout/footer";
import { PricingHeader } from "./layout/header";
import { Plans, PlansSkeleton } from "./plans/plans";

import type { User } from "@turbostarter/auth";
import type {
  PricingPlanWithPrices,
  BillingConfig,
  Customer,
} from "@turbostarter/billing";

interface PricingProps {
  readonly user: User | null;
  readonly customer: Customer | null;
  readonly plans: PricingPlanWithPrices[];
  readonly config: BillingConfig;
}

export const Pricing = memo<PricingProps>(
  ({ plans, config, user, customer }) => {
    const intervals = [
      ...new Set(
        plans.flatMap((plan) =>
          plan.prices
            .flatMap((price) => price.recurring?.interval)
            .filter((x): x is RecurringInterval => !!x),
        ),
      ),
    ].sort(
      (a, b) => RecurringIntervalDuration[a] - RecurringIntervalDuration[b],
    );

    const [activeInterval, setActiveInterval] = useState<RecurringInterval>(
      intervals[0] ?? RecurringInterval.MONTH,
    );

    const priceWithDiscount = getPriceWithHighestDiscount(plans);

    console.log(priceWithDiscount);

    return (
      <div className="mt-4 flex w-full flex-col items-center justify-start gap-14 pb-16 lg:gap-24 lg:pb-28">
        <PricingHeader
          model={config.model}
          intervals={intervals}
          activeInterval={activeInterval}
          onIntervalChange={setActiveInterval}
          {...(priceWithDiscount && { priceWithDiscount })}
        />
        <Plans
          plans={plans}
          interval={activeInterval}
          model={config.model}
          user={user}
          customer={customer}
        />
        <PricingFooter provider={config.provider} />
      </div>
    );
  },
);

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
