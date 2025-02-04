import { memo } from "react";

import { BillingModel, formatPrice } from "@turbostarter/billing";
import { isKey, useTranslation } from "@turbostarter/i18n";
import { cn } from "@turbostarter/ui";
import { Badge } from "@turbostarter/ui-web/badge";
import { Button, buttonVariants } from "@turbostarter/ui-web/button";
import { Card } from "@turbostarter/ui-web/card";
import { Icons } from "@turbostarter/ui-web/icons";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

import { usePlan } from "./hooks/use-plan";

import type { User } from "@turbostarter/auth";
import type {
  Customer,
  Discount,
  PricingPlan,
  RecurringInterval,
} from "@turbostarter/billing";

interface PlanProps {
  readonly plan: PricingPlan;
  readonly user: User | null;
  readonly customer: Customer | null;
  readonly interval: RecurringInterval;
  readonly model: BillingModel;
  readonly currency: string;
  readonly discounts: Discount[];
}

export const Plan = memo<PlanProps>(
  ({ plan, interval, user, customer, model, currency, discounts }) => {
    const { t, i18n } = useTranslation(["common", "billing"]);
    const {
      features,
      price,
      discount,
      isPending,
      handleCheckout,
      handleOpenPortal,
      hasPlan,
    } = usePlan(plan, { model, interval, discounts, currency });

    if (!price) {
      return null;
    }

    return (
      <div
        className={cn(
          "grow-0 basis-[23.5rem] rounded-lg bg-gradient-to-br from-primary via-primary/30 to-primary/50 md:shrink-0",
          plan.badge
            ? "basis-[24.5rem] p-1 shadow-lg shadow-primary/40"
            : "shadow",
        )}
      >
        <Card className="relative flex flex-col gap-8 px-7 py-6 md:px-10 md:py-8">
          {plan.badge && (
            <Badge className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 px-6 py-2.5 hover:bg-primary">
              {isKey(plan.badge, i18n, "billing") ? t(plan.badge) : plan.badge}
            </Badge>
          )}
          <div>
            <span className="text-lg font-bold">
              {isKey(plan.name, i18n, "billing") ? t(plan.name) : plan.name}
            </span>
            <p className="relative flex items-end gap-1 py-2">
              {discount?.original &&
                "amount" in discount.original &&
                typeof discount.original.amount === "number" &&
                discount.percentage > 0 && (
                  <span className="mr-2 text-lg text-muted-foreground line-through md:text-xl">
                    {formatPrice(
                      {
                        amount: discount.original.amount,
                        currency,
                      },
                      i18n.language,
                    )}
                  </span>
                )}
              <span className="text-4xl font-bold tracking-tight md:text-5xl">
                {price.custom
                  ? isKey(price.label, i18n, "billing")
                    ? t(price.label)
                    : price.label
                  : formatPrice(
                      {
                        amount:
                          discount?.discounted &&
                          "amount" in discount.discounted
                            ? discount.discounted.amount
                            : price.amount,
                        currency,
                      },
                      i18n.language,
                    )}
              </span>
              {!price.custom && (
                <span className="shrink-0 text-lg text-muted-foreground">
                  /{" "}
                  {price.type === BillingModel.RECURRING
                    ? t(`interval.${price.interval}`)
                    : t("interval.lifetime")}
                </span>
              )}
            </p>
            <span className="text-sm">
              {isKey(plan.description, i18n, "billing")
                ? t(plan.description)
                : plan.description}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {features?.map((feature) => (
              <div
                key={feature.title}
                className={cn("flex items-center gap-3 py-1", {
                  "opacity-50": !feature.available,
                })}
              >
                <div
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    feature.available ? "bg-primary" : "border border-primary",
                  )}
                >
                  {feature.available ? (
                    <Icons.CheckIcon className="w-3 text-primary-foreground" />
                  ) : (
                    <Icons.X className="w-3 text-primary" />
                  )}
                </div>
                <span className="text-md">
                  {isKey(feature.title, i18n, "billing")
                    ? t(feature.title)
                    : feature.title}
                  {"addon" in feature && (
                    <span className="ml-2 whitespace-nowrap">
                      &nbsp;{feature.addon}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {"trialDays" in price && price.trialDays && !hasPlan(customer) && (
              <Button
                variant="outline"
                onClick={() => handleCheckout(user)}
                disabled={isPending}
              >
                {isPending ? (
                  <Icons.Loader2 className="animate-spin" />
                ) : (
                  t("trial.period", { period: price.trialDays })
                )}
              </Button>
            )}
            {price.custom ? (
              <TurboLink href={price.href} className={buttonVariants()}>
                {hasPlan(customer) ? t("manage.plan.title") : t("getStarted")}
              </TurboLink>
            ) : price.amount === 0 ? (
              <TurboLink
                href={
                  user ? pathsConfig.dashboard.index : pathsConfig.auth.login
                }
                className={buttonVariants({ variant: "outline" })}
              >
                {user ? t("goToDashboard") : t("trial.cta")}
              </TurboLink>
            ) : (
              <Button
                onClick={() =>
                  model === BillingModel.RECURRING && hasPlan(customer)
                    ? handleOpenPortal(user)
                    : handleCheckout(user)
                }
                disabled={isPending}
              >
                {isPending ? (
                  <Icons.Loader2 className="animate-spin" />
                ) : model === BillingModel.RECURRING && hasPlan(customer) ? (
                  t("manage.plan.title")
                ) : model === BillingModel.RECURRING ? (
                  t("subscribe")
                ) : (
                  t("getLifetimeAccess")
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  },
);

Plan.displayName = "Plan";
