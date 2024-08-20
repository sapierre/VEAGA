"use client";

import { memo } from "react";

import {
  calculatePriceDiscount,
  formatPrice,
  BillingDiscountType,
} from "@turbostarter/billing";
import { Icons } from "@turbostarter/ui";

import type { PricingPlanPrice } from "@turbostarter/billing";

interface DiscountProps {
  readonly priceWithDiscount?: PricingPlanPrice;
}

export const Discount = memo<DiscountProps>(({ priceWithDiscount }) => {
  if (!priceWithDiscount) {
    return null;
  }

  const discount = calculatePriceDiscount(priceWithDiscount);

  return (
    <p className="sm mt-2 text-center md:text-lg">
      <Icons.Gift className="mb-1.5 mr-1.5 inline-block h-5 w-5 text-primary" />
      <span>
        <span className="font-semibold text-primary">
          -
          {`${discount?.type === BillingDiscountType.PERCENT ? discount.percentage + "%" : formatPrice({ amount: (discount?.original.amount ?? 0) - (discount?.discounted.amount ?? 0), currency: discount?.original.currency })}`}{" "}
          off
        </span>{" "}
        for the next {priceWithDiscount.promotionCode?.maxRedemptions} customers
        (
        {(priceWithDiscount.promotionCode?.maxRedemptions ?? 0) -
          (priceWithDiscount.promotionCode?.timesRedeemed ?? 0)}{" "}
        left)
      </span>
    </p>
  );
});

Discount.displayName = "Discount";
