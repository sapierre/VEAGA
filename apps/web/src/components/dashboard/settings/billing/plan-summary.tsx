import dayjs from "dayjs";
import { memo } from "react";

import {
  ACTIVE_BILLING_STATUSES,
  BillingStatus,
  config,
  PricingPlanType,
} from "@turbostarter/billing";
import { cn } from "@turbostarter/ui";
import { Badge } from "@turbostarter/ui-web/badge";
import { buttonVariants } from "@turbostarter/ui-web/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";
import { Icons } from "@turbostarter/ui-web/icons";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

import type { Customer } from "@turbostarter/billing";

interface PlanSummaryProps {
  readonly customer: Customer | null;
}

export const PlanSummary = memo<PlanSummaryProps>(({ customer }) => {
  const plan = config.plans.find(
    (plan) => plan.type === (customer?.plan ?? PricingPlanType.FREE),
  );

  if (!plan) {
    return null;
  }

  const isHigherPlanAvailable =
    config.plans.findIndex((p) => p.id === plan.id) <
    config.plans.filter((p) => p.prices.some((price) => "amount" in price))
      .length -
      1;

  const status = customer?.status ?? BillingStatus.ACTIVE;

  return (
    <Card className="h-fit w-full max-w-3xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Your plan</CardTitle>
        <CardDescription className="flex flex-col gap-1 py-1.5 text-foreground">
          Check the details of your current plan. You can change your plan or
          cancel your subscription at any time.
        </CardDescription>
      </CardHeader>

      <CardContent className="border-t">
        <div className="flex flex-col gap-2 rounded-md pt-6">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <div className="flex items-center gap-2">
              {ACTIVE_BILLING_STATUSES.includes(status) ? (
                <Icons.BadgeCheck className="size-5" />
              ) : (
                <Icons.BadgeX className="size-5" />
              )}
              <span className="text-lg font-bold capitalize">{plan.name}</span>
              <Badge
                className={cn(
                  "ml-1 bg-destructive/15 capitalize text-destructive hover:bg-destructive/25",
                  {
                    "bg-success/15 text-success hover:bg-success/25":
                      status === BillingStatus.ACTIVE,
                    "bg-muted text-muted-foreground hover:bg-muted/25":
                      status === BillingStatus.TRIALING,
                  },
                )}
              >
                {status.toLowerCase().replace("_", " ")}
              </Badge>
            </div>

            <span className="text-sm text-muted-foreground">
              Updated at{" "}
              {dayjs(customer?.updatedAt).toDate().toLocaleDateString()}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            {plan.description}{" "}
            <TurboLink
              href={pathsConfig.marketing.pricing}
              className="font-semibold underline hover:no-underline"
            >
              Learn more
            </TurboLink>
          </p>

          {isHigherPlanAvailable && (
            <TurboLink
              href={pathsConfig.marketing.pricing}
              className={cn(buttonVariants(), "mt-2 w-fit gap-1")}
            >
              Upgrade
              <Icons.ArrowUpRight className="size-4" />
            </TurboLink>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

PlanSummary.displayName = "PlanSummary";
