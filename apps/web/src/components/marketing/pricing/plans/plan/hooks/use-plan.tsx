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
import { useTranslation } from "@turbostarter/i18n";

import { PLAN_FEATURES } from "~/components/marketing/pricing/constants/features";
import { appConfig } from "~/config/app";
import { pathsConfig } from "~/config/paths";
import { api } from "~/lib/api/client";

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
    currency?: string;
  },
) => {
  const { t } = useTranslation("billing");
  const router = useRouter();
  const checkout = useMutation({
    mutationFn: handle(api.billing.checkout.$post),
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      if (!data.url) {
        return toast.error(t("error.checkout"));
      }
      return router.push(data.url);
    },
  });

  const getPortal = useMutation({
    mutationFn: handle(api.billing.portal.$get),
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      if (!data.url) {
        return toast.error(t("error.portal"));
      }
      return router.push(data.url);
    },
  });

  const pathname = usePathname();
  const price = getPlanPrice(plan, options);

  const features = plan.id in PLAN_FEATURES ? PLAN_FEATURES[plan.id] : null;

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
          success: `${appConfig.url}${pathsConfig.dashboard.index}`,
          cancel: `${appConfig.url}${pathname}`,
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
        redirectUrl: `${appConfig.url}${pathname}`,
      },
    });
  };

  const hasPlan = (customer: Customer | null) => {
    if (!customer) {
      return false;
    }

    const currentPlanIndex = Object.values(PricingPlanType).indexOf(plan.id);
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
