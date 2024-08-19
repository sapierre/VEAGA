import { User } from "@turbostarter/auth";
import {
  BillingModel,
  Customer,
  PricingPlanPrice,
  PricingPlanWithPrices,
  RecurringInterval,
  formatPrice,
} from "@turbostarter/billing";
import { Icons, cn } from "@turbostarter/ui";
import { Button, Card, Badge, buttonVariants } from "@turbostarter/ui/web";
import Link from "next/link";
import { memo } from "react";
import { usePlan } from "./hooks/use-plan";
import { onPromise } from "~/utils";
import { pathsConfig } from "~/config/paths";

type PlanProps = {
  readonly plan: PricingPlanWithPrices;
  readonly user: User | null;
  readonly customer: Customer | null;
  readonly interval: RecurringInterval;
  readonly model: BillingModel;
};

export const Plan = memo<PlanProps>(
  ({ plan, interval, user, customer, model }) => {
    const {
      features,
      price,
      discount,
      //   trial,
      loading,
      handleCheckout,
      handleOpenPortal,
      hasPlan,
    } = usePlan(plan, model, interval);

    if (!price || !features) {
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
              {plan.badge}
            </Badge>
          )}
          <div>
            <span className="text-lg font-bold">{plan.name}</span>
            <p className="relative flex items-end gap-1 py-2">
              {typeof discount?.original.amount === "number" &&
                discount?.percentage > 0 && (
                  <span className="mr-2 text-lg text-muted-foreground line-through md:text-xl">
                    {formatPrice(discount.original)}
                  </span>
                )}
              <span className="text-4xl font-bold md:text-5xl">
                {formatPrice(discount?.discounted ?? price)}
              </span>
              <span className="shrink-0 text-lg text-muted-foreground">
                / {!price.recurring ? "lifetime" : price.recurring.interval}
              </span>

              {typeof discount?.percentage === "number" &&
                discount?.percentage > 0 && (
                  <span className="-mt-1 ml-2 inline-block self-start rounded-lg bg-success/15 px-2 py-0.5 text-sm text-success">
                    -{discount.percentage}%
                  </span>
                )}
            </p>
            <span className="text-sm">{plan.description}</span>
          </div>

          <div className="flex flex-col gap-1">
            {features.map((feature) => (
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
                  {feature.title}
                  {"addon" in feature && (
                    <span className="ml-2 whitespace-nowrap">
                      &nbsp;{feature.addon}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {/* {trial && !hasPlan(customer) && (
              <Button
                variant="outline"
                onClick={onPromise(() => handleCheckout(user, trial))}
                disabled={loading === "trial"}
              >
                {loading === "trial" ? (
                  <Icons.Loader2 className="animate-spin" />
                ) : (
                  `Try with ${trial}-days trial`
                )}
              </Button>
            )} */}
            {price.amount === 0 ? (
              <Link
                href={user ? pathsConfig.admin.index : pathsConfig.auth.login}
                className={buttonVariants({ variant: "outline" })}
              >
                {user ? "Go to dashboard" : "Start for free"}
              </Link>
            ) : (
              <Button
                onClick={onPromise(() =>
                  model === BillingModel.RECURRING && hasPlan(customer)
                    ? handleOpenPortal(user)
                    : handleCheckout(user),
                )}
                disabled={loading === "checkout" || loading === "portal"}
              >
                {loading === "checkout" || loading === "portal" ? (
                  <Icons.Loader2 className="animate-spin" />
                ) : model === BillingModel.RECURRING && hasPlan(customer) ? (
                  "Manage plan"
                ) : model === BillingModel.RECURRING ? (
                  "Subscribe now"
                ) : (
                  "Get lifetime access"
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
