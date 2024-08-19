import {
  BillingModel,
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

// year 1000
// week 50

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
    ([intervalKey, multiplier]) => intervalKey === minPrice.recurring?.interval,
  );

  const maxMultiplierIndex = Object.entries(INTERVAL_MULTIPLIER).findIndex(
    ([intervalKey, multiplier]) => intervalKey === interval,
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
    };
  }

  return null;
};
