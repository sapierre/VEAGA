"use client";

import { motion } from "framer-motion";
import { memo } from "react";

import { PRICING_MODEL } from "@/components/landing/pricing/constants";
import { calculatePriceDiscount } from "@/components/landing/pricing/utils/price";
import { Icons } from "@/components/ui/icons";
import { api } from "@/trpc/react";
import { cn } from "@/utils";

import type { PricingPlanPrice } from "@syncreads/api";

type DiscountProps = {
  readonly priceWithDiscount?: PricingPlanPrice;
  readonly fallback?: boolean;
  readonly className?: string;
  readonly iconClassName?: string;
  readonly animate?: boolean;
};

export const Discount = memo<DiscountProps>(
  ({
    priceWithDiscount,
    fallback = false,
    className,
    iconClassName,
    animate = true,
  }) => {
    const { data: plans, isLoading } =
      api.payment.subscription.getPlans.useQuery(
        {
          type: PRICING_MODEL,
        },
        {
          enabled: !priceWithDiscount && fallback,
        },
      );

    if ((isLoading || !plans) && !priceWithDiscount) {
      return fallback ? <div className="h-7 w-full md:h-8"></div> : null;
    }

    const fetchedPriceWithDiscount = plans
      ?.flatMap((plan) => plan.prices.filter((price) => price.promotionCode))
      .filter(Boolean)?.[0];

    const price = priceWithDiscount ?? fetchedPriceWithDiscount;

    if (!price) {
      return null;
    }

    return (
      <motion.p
        className={cn("sm mt-2 text-center", className)}
        {...(animate && {
          initial: { opacity: 0, y: -5 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -5 },
        })}
      >
        <Icons.Gift
          className={cn(
            "mb-1.5 mr-1.5 inline-block h-5 w-5 text-sky",
            iconClassName,
          )}
        />
        <span>
          <span className="font-semibold text-sky">
            {`-${calculatePriceDiscount(price)?.percentage}%`} off
          </span>{" "}
          for the first {price.promotionCode?.maxRedemptions} customers (
          {(price.promotionCode?.maxRedemptions ?? 0) -
            (price.promotionCode?.timesRedeemed ?? 0) -
            7}{" "}
          left)
        </span>
      </motion.p>
    );
  },
);

Discount.displayName = "Discount";
