"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { toast } from "sonner";

import { handle } from "@turbostarter/api/utils";
import { config, PricingPlanType } from "@turbostarter/billing";
import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-web/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";
import { Icons } from "@turbostarter/ui-web/icons";

import { api } from "~/lib/api/client";

import type { Customer } from "@turbostarter/billing";

interface ManagePlanProps {
  readonly customer: Customer | null;
}

export const ManagePlan = memo<ManagePlanProps>(({ customer }) => {
  const { t } = useTranslation("billing");
  const router = useRouter();
  const getPortal = useMutation({
    mutationFn: handle(api.billing.portal.$get),
    onSuccess: ({ url }) => {
      router.push(url);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const plan = config.plans.find(
    (plan) => plan.id === (customer?.plan ?? PricingPlanType.FREE),
  );

  if (!plan) {
    return null;
  }

  return (
    <Card className="h-fit w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">{t("manage.billing.title")}</CardTitle>
        <CardDescription className="flex flex-col gap-1 py-1.5 text-foreground">
          {t("manage.billing.description")}
        </CardDescription>

        <Button
          className="w-fit gap-1"
          disabled={getPortal.isPending}
          onClick={() =>
            getPortal.mutate({
              query: {
                redirectUrl: window.location.href,
              },
            })
          }
        >
          {t("manage.billing.visitPortal")}
          {getPortal.isPending ? (
            <Icons.Loader2 className="size-4 animate-spin" />
          ) : (
            <Icons.ArrowUpRight className="size-4" />
          )}
        </Button>
      </CardHeader>
    </Card>
  );
});

ManagePlan.displayName = "ManagePlan";
