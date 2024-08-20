import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  BillingModel,
  PricingPlanType,
  calculatePriceDiscount,
  calculateRecurringDiscount,
  getProductPrice,
} from "@turbostarter/billing";

import { PLAN_FEATURES } from "~/components/pricing/constants/features";
import { pathsConfig } from "~/config/paths";
import { publicUrl } from "~/lib/env";
import { api } from "~/trpc/react";

import type { User } from "@turbostarter/auth";
import type {
  Customer,
  PricingPlanWithPrices,
  RecurringInterval,
} from "@turbostarter/billing";

export const usePlan = (
  plan: PricingPlanWithPrices,
  model: BillingModel,
  interval: RecurringInterval,
) => {
  const { mutateAsync: checkout, isPending: isCheckoutPending } =
    api.billing.checkout.useMutation({
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutateAsync: getPortal, isPending: isPortalPending } =
    api.billing.getPortal.useMutation({
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const router = useRouter();
  const pathname = usePathname();
  const price = getProductPrice(plan, model, interval);

  const features = plan.type in PLAN_FEATURES ? PLAN_FEATURES[plan.type] : null;
  const discount = price?.promotionCode
    ? calculatePriceDiscount(price)
    : model === BillingModel.RECURRING
      ? calculateRecurringDiscount(plan, interval)
      : null;

  const handleCheckout = async (user: User | null) => {
    if (!user) {
      return router.push(
        `${pathsConfig.auth.login}?redirectTo=${pathsConfig.pricing}`,
      );
    }

    if (!price) {
      return;
    }

    const { url } = await checkout({
      price: {
        ...price,
        ...(price.recurring?.trialDays && {
          trialDays: price.recurring.trialDays,
        }),
      },
      redirect: {
        success: `${publicUrl}${pathsConfig.index}`,
        cancel: `${publicUrl}${pathname}`,
      },
    });

    if (!url) {
      toast.error("An error occurred while checking out.");
      return;
    }

    return router.push(url);
  };

  const handleOpenPortal = async (user: User | null) => {
    if (!user) {
      return router.push(
        `${pathsConfig.auth.login}?redirectTo=${pathsConfig.pricing}`,
      );
    }

    const { url } = await getPortal({
      redirectUrl: `${publicUrl}${pathname}`,
    });

    return router.push(url);
  };

  const hasPlan = (customer: Customer | null) => {
    if (!customer) {
      return false;
    }

    const currentPlanIndex = Object.values(PricingPlanType).indexOf(plan.type);
    const customerCurrentPlanIndex = customer.plan
      ? Object.values(PricingPlanType).indexOf(customer.plan)
      : -1;

    return currentPlanIndex <= customerCurrentPlanIndex;
  };

  return {
    isPending: isCheckoutPending || isPortalPending,
    price,
    features,
    discount,
    handleCheckout,
    handleOpenPortal,
    hasPlan,
  };
};
