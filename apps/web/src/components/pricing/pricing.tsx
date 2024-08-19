"use client";

import { memo, useState } from "react";

// import { DEFAULT_SUBSCRIPTION_INTERVAL } from "@/components/landing/pricing/constants";
import { Skeleton } from "@turbostarter/ui/web";

import { PricingHeader } from "./layout/header";
import { Plans, PlansSkeleton } from "./plans/plans";
import {
  PricingPlanWithPrices,
  RecurringInterval,
  BillingConfig,
} from "@turbostarter/billing";

type PricingProps = {
  //   readonly user: User | null;
  //   readonly customer: Customer | null;
  readonly plans: PricingPlanWithPrices[];
  readonly config: BillingConfig;
};

export const Pricing = memo<PricingProps>(({ plans, config }) => {
  const intervals = [
    ...new Set(
      plans.flatMap((plan) =>
        plan.prices
          .flatMap((price) => price.recurring?.interval)
          .filter((x): x is RecurringInterval => !!x),
      ),
    ),
  ];

  const [activeInterval, setActiveInterval] = useState<RecurringInterval>(
    intervals[0] ?? RecurringInterval.MONTH,
  );

  const priceWithDiscount = plans
    .flatMap((plan) => plan.prices.filter((price) => price.promotionCode))
    .filter(Boolean)?.[0];

  return (
    <div className="mt-4 flex w-full flex-col items-center justify-start gap-14 pb-16 lg:gap-24 lg:pb-28">
      <PricingHeader
        model={config.model}
        intervals={intervals}
        activeInterval={activeInterval}
        onIntervalChange={setActiveInterval}
        {...(priceWithDiscount && { priceWithDiscount })}
      />
      <Plans plans={plans} interval={activeInterval} model={config.model} />
    </div>
  );
});

// export const PricingSkeleton = () => {
//   return (
//     <div className="mt-2 flex w-full flex-col items-center justify-start gap-14 pb-16 lg:gap-24 lg:pb-28">
//       <div className="flex flex-col items-center justify-center gap-3">
//         <Skeleton className="h-12 w-72" />
//         <Skeleton className="h-8 w-96" />
//       </div>
//       <PlansSkeleton />
//     </div>
//   );
// };

Pricing.displayName = "Pricing";
