import dayjs from "dayjs";
import { memo } from "react";

import {
  ACTIVE_BILLING_STATUSES,
  BillingStatus,
  config,
  PricingPlanType,
} from "@turbostarter/billing";
import { isKey } from "@turbostarter/i18n";
import { getTranslation } from "@turbostarter/i18n/server";
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

export const PlanSummary = memo<PlanSummaryProps>(async ({ customer }) => {
  const { t, i18n } = await getTranslation({ ns: ["common", "billing"] });
  const plan = config.plans.find(
    (plan) => plan.id === (customer?.plan ?? PricingPlanType.FREE),
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

  const statusKey = `status.${status.toLowerCase().replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase())}`;

  return (
    <Card className="h-fit w-full overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{t("manage.plan.title")}</CardTitle>
        <CardDescription className="flex flex-col gap-1 pb-1.5 text-foreground">
          {t("manage.plan.description")}
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
              <span className="text-lg font-bold capitalize">
                {isKey(plan.name, i18n, "billing") ? t(plan.name) : plan.name}
              </span>
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
                {isKey(statusKey, i18n, "billing") ? t(statusKey) : statusKey}
              </Badge>
            </div>

            <span className="text-sm text-muted-foreground">
              {t("updatedAt")}{" "}
              {dayjs(customer?.updatedAt)
                .toDate()
                .toLocaleDateString(i18n.language)}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            {isKey(plan.description, i18n, "billing")
              ? t(plan.description)
              : plan.description}{" "}
            <TurboLink
              href={pathsConfig.marketing.pricing}
              className="font-semibold underline hover:no-underline"
            >
              {t("learnMore")}
            </TurboLink>
          </p>

          {isHigherPlanAvailable && (
            <TurboLink
              href={pathsConfig.marketing.pricing}
              className={cn(buttonVariants(), "mt-2 w-fit gap-1")}
            >
              {t("upgrade")}
              <Icons.ArrowUpRight className="size-4" />
            </TurboLink>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

PlanSummary.displayName = "PlanSummary";
