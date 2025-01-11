"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { toast } from "sonner";

import { handle } from "@turbostarter/api/utils";
import { config, PricingPlanType } from "@turbostarter/billing";
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
    (plan) => plan.type === (customer?.plan ?? PricingPlanType.FREE),
  );

  if (!plan) {
    return null;
  }

  return (
    <Card className="h-fit w-full max-w-3xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">Manage billing</CardTitle>
        <CardDescription className="flex flex-col gap-1 py-1.5 text-foreground">
          Visit the Billing Portal to manage your subscription and billing. You
          can update your payment method, cancel your subscription, download
          invoices and more.
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
          Visit Billing Portal
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
