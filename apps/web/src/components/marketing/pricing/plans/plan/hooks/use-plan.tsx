import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { handle } from "@turbostarter/api/utils";
import {
  BillingModel,
  PricingPlanType,
  calculatePriceDiscount,
  calculateRecurringDiscount,
  getPlanPrice,
  getHighestDiscountForPrice,
} from "@turbostarter/billing";

import { PLAN_FEATURES } from "~/components/marketing/pricing/constants/features";
import { pathsConfig } from "~/config/paths";
import { api } from "~/lib/api/client";
import { env } from "~/lib/env";

import type { User } from "@turbostarter/auth";
import type {
  Customer,
  Discount,
  PricingPlan,
  RecurringInterval,
} from "@turbostarter/billing";

export const usePlan = (
  plan: PricingPlan,
  options: {
    model: BillingModel;
    interval: RecurringInterval;
    discounts: Discount[];
  },
) => {
  const router = useRouter();
  const checkout = useMutation({
    mutationFn: handle(api.billing.checkout.$post),
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      if (!data.url) {
        return toast.error("An error occurred while checking out.");
      }
      return router.push(data.url);
    },
  });

  const getPortal = useMutation({
    mutationFn: handle(api.billing.portal.$get),
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      if (!data.url) {
        return toast.error("An error occurred while getting the portal URL.");
      }
      return router.push(data.url);
    },
  });

  const pathname = usePathname();
  const price = getPlanPrice(plan, options.model, options.interval);

  const features = plan.type in PLAN_FEATURES ? PLAN_FEATURES[plan.type] : null;

  const discountForPrice = price
    ? getHighestDiscountForPrice(price, options.discounts)
    : null;

  const discount =
    price && discountForPrice
      ? calculatePriceDiscount(price, discountForPrice)
      : options.model === BillingModel.RECURRING
        ? calculateRecurringDiscount(plan, options.interval)
        : null;

  const handleCheckout = (user: User | null) => {
    if (!user) {
      return router.push(
        `${pathsConfig.auth.login}?redirectTo=${pathsConfig.marketing.pricing}`,
      );
    }

    if (!price) {
      return;
    }

    checkout.mutate({
      json: {
        price: {
          id: price.id,
        },
        redirect: {
          success: `${env.NEXT_PUBLIC_SITE_URL}${pathsConfig.dashboard.index}`,
          cancel: `${env.NEXT_PUBLIC_SITE_URL}${pathname}`,
        },
      },
    });
  };

  const handleOpenPortal = (user: User | null) => {
    if (!user) {
      return router.push(
        `${pathsConfig.auth.login}?redirectTo=${pathsConfig.marketing.pricing}`,
      );
    }

    getPortal.mutate({
      query: {
        redirectUrl: `${env.NEXT_PUBLIC_SITE_URL}${pathname}`,
      },
    });
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
    isPending: checkout.isPending || getPortal.isPending,
    price,
    features,
    discount,
    handleCheckout,
    handleOpenPortal,
    hasPlan,
  };
};
