import { memo } from "react";

// import { DEFAULT_SUBSCRIPTION_INTERVAL } from "@/components/landing/pricing/constants";
import { Skeleton } from "@turbostarter/ui/web";

import { Plan } from "./plan/plan";
import {
  BillingModel,
  PricingPlanWithPrices,
  RecurringInterval,
} from "@turbostarter/billing";

type PlansProps = {
  readonly plans: PricingPlanWithPrices[];
  //   readonly user: User | null;
  //   readonly customer: Customer | null;
  readonly interval: RecurringInterval;
  readonly model: BillingModel;
};

export const Plans = memo<PlansProps>(({ plans, interval, model }) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-6 lg:gap-4">
      {plans.map((plan) => (
        <Plan
          key={plan.id}
          plan={plan}
          interval={interval}
          user={null}
          customer={null}
          model={model}
          // user={user}
          // customer={customer}
        />
      ))}
    </div>
  );
});

export const PlansSkeleton = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-6 lg:gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="grow-0 basis-[25rem] md:shrink-0">
          <Skeleton className="h-[32rem] w-full" />
        </div>
      ))}
    </div>
  );
};

Plans.displayName = "Plans";
