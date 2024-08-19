import { User } from "@turbostarter/auth";
import {
  BillingModel,
  Customer,
  PricingPlanType,
  PricingPlanWithPrices,
  RecurringInterval,
  calculatePriceDiscount,
  calculateRecurringDiscount,
  getProductPrice,
} from "@turbostarter/billing";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { PLAN_FEATURES } from "~/components/pricing/constants/features";

type LoadingStatus = "trial" | "checkout" | "portal" | null;

export const usePlan = (
  plan: PricingPlanWithPrices,
  model: BillingModel,
  interval: RecurringInterval,
) => {
  const [loading, setLoading] = useState<LoadingStatus>(null);
  const router = useRouter();
  const pathname = usePathname();
  const price = getProductPrice(plan, model, interval);

  const features = plan.type in PLAN_FEATURES ? PLAN_FEATURES[plan.type] : null;
  //   const trial =
  //     PRICING_MODEL === "recurring" && TRIAL_ON_PLANS.includes(plan.type)
  //       ? TRIAL_DURATION_DAYS
  //       : undefined;

  const discount = price?.promotionCode
    ? calculatePriceDiscount(price)
    : model === BillingModel.RECURRING
      ? calculateRecurringDiscount(plan, interval)
      : null;

  const handleCheckout = async (user: User | null, trial?: number) => {
    setLoading(trial ? "trial" : "checkout");
    if (!user) {
      setLoading(null);
      return router.push("/auth/login?redirectTo=/pricing");
    }

    if (!price) {
      setLoading(null);
      return;
    }

    // const { sessionId, error } = await checkoutUser(price, pathname, trial);

    // if (!sessionId) {
    //   setLoading(null);
    //   toast.error(error);
    //   return;
    // }

    // const stripe = await getStripe();
    // await stripe?.redirectToCheckout({ sessionId });
    setLoading(null);
    return;
  };

  const handleOpenPortal = async (user: User | null) => {
    setLoading("portal");
    if (!user) {
      setLoading(null);
      return router.push("/auth/login?redirectTo=/pricing");
    }

    // const { url, error } = await goToCustomerPortal(pathname);

    // if (!url) {
    //   setLoading(null);
    //   toast.error(error);
    //   return;
    // }

    setLoading(null);
    // router.push(url);
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
    loading,
    price,
    features,
    // trial,
    discount,
    handleCheckout,
    handleOpenPortal,
    hasPlan,
  };
};
