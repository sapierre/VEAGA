import { BillingDiscountType, BillingModel } from "../types";

import type {
  PricingPlanPrice,
  PricingPlanWithPrices,
  RecurringInterval,
} from "../types";

const INTERVAL_MULTIPLIER: Record<RecurringInterval, number> = {
  day: 7,
  week: 4,
  month: 12,
  year: 1,
};

export const getProductPrice = (
  product: PricingPlanWithPrices,
  model: BillingModel,
  interval?: RecurringInterval,
) => {
  if (model === BillingModel.RECURRING && interval) {
    return product.prices.find(
      (price) => price.recurring?.interval === interval,
    );
  }

  return product.prices.find((price) => price.type === model);
};

export const formatPrice = (price: { amount: number; currency?: string }) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format(price.amount / 100);
};

export const calculateRecurringDiscount = (
  product: PricingPlanWithPrices,
  interval: RecurringInterval,
) => {
  const recurringPrices = product.prices.filter((price) => price.recurring);
  const minPrice = recurringPrices.reduce((acc, price) => {
    if (price.amount < (acc?.amount ?? 0)) {
      return price;
    }
    return acc;
  }, recurringPrices[0]);

  const chosenPrice = recurringPrices.find(
    (price) => price.recurring?.interval === interval,
  );

  if (!chosenPrice || !minPrice) {
    return null;
  }

  const minMultiplierIndex = Object.entries(INTERVAL_MULTIPLIER).findIndex(
    ([intervalKey]) => intervalKey === minPrice.recurring?.interval,
  );

  const maxMultiplierIndex = Object.entries(INTERVAL_MULTIPLIER).findIndex(
    ([intervalKey]) => intervalKey === interval,
  );

  const multiplersToApply = Object.values(INTERVAL_MULTIPLIER).slice(
    minMultiplierIndex,
    maxMultiplierIndex,
  );

  const minPriceInSameInterval =
    minPrice.amount *
    multiplersToApply.reduce((acc, multiplier) => acc * multiplier, 1);

  const discount = Math.round(
    (1 - chosenPrice.amount / minPriceInSameInterval) * 100,
  );

  return {
    original: {
      ...minPrice,
      amount: minPriceInSameInterval,
    },
    discounted: chosenPrice,
    percentage: isNaN(discount) ? 0 : discount,
  };
};

export const calculatePriceDiscount = (price: PricingPlanPrice) => {
  const amount = price.amount;
  const amountOff = price.promotionCode?.coupon.amountOff;
  const percentOff = price.promotionCode?.coupon.percentOff;

  if (amountOff) {
    return {
      original: price,
      discounted: {
        ...price,
        amount: amount - amountOff,
      },
      percentage: Math.floor((amountOff / amount) * 100),
      type: BillingDiscountType.AMOUNT,
    };
  }

  if (percentOff) {
    return {
      original: price,
      discounted: {
        ...price,
        amount: amount - (amount * percentOff) / 100,
      },
      percentage: percentOff,
      type: BillingDiscountType.PERCENT,
    };
  }

  return null;
};

export const getPriceWithHighestDiscount = (plans: PricingPlanWithPrices[]) => {
  const pricesWithDiscount = plans
    .flatMap((plan) => plan.prices)
    .filter((price) => price.promotionCode && price.amount > 0);

  const [highestDiscount] = pricesWithDiscount.sort((a, b) => {
    const discountA = calculatePriceDiscount(a);
    const discountB = calculatePriceDiscount(b);

    const amountA =
      (discountA?.original.amount ?? 0) - (discountA?.discounted.amount ?? 0);
    const amountB =
      (discountB?.original.amount ?? 0) - (discountB?.discounted.amount ?? 0);

    return amountB - amountA;
  });

  return highestDiscount;
};
