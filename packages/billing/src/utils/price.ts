import { BillingDiscountType, BillingModel } from "../types";

import type {
  PricingPlanPrice,
  PricingPlan,
  RecurringInterval,
  Discount,
} from "../types";

const INTERVAL_MULTIPLIER: Record<RecurringInterval, number> = {
  day: 7,
  week: 4,
  month: 12,
  year: 1,
};

export const getPlanPrice = (
  plan: PricingPlan,
  model: BillingModel,
  interval?: RecurringInterval,
) => {
  if (model === BillingModel.RECURRING && interval) {
    return plan.prices.find(
      (price) =>
        price.type === BillingModel.RECURRING && price.interval === interval,
    );
  }

  return plan.prices.find((price) => price.type === model);
};

export const formatPrice = (price: { amount: number; currency: string }) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format(price.amount / 100);
};

export const calculateRecurringDiscount = (
  product: PricingPlan,
  interval: RecurringInterval,
) => {
  const recurringPrices = product.prices.filter(
    (price) => price.type === BillingModel.RECURRING,
  );
  const minPrice = recurringPrices.reduce((acc, price) => {
    if (price.amount < (acc?.amount ?? 0)) {
      return price;
    }
    return acc;
  }, recurringPrices[0]);

  const chosenPrice = recurringPrices.find(
    (price) => "interval" in price && price.interval === interval,
  );

  if (!chosenPrice || !minPrice) {
    return null;
  }

  const minMultiplierIndex = Object.entries(INTERVAL_MULTIPLIER).findIndex(
    ([intervalKey]) =>
      "interval" in minPrice && intervalKey === minPrice.interval,
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

export const calculatePriceDiscount = (
  price: PricingPlanPrice,
  discount: Discount,
) => {
  const amount = price.amount;

  if (discount.type === BillingDiscountType.AMOUNT) {
    return {
      original: price,
      discounted: {
        ...price,
        amount: amount - discount.off,
      },
      percentage: Math.floor((discount.off / amount) * 100),
      type: BillingDiscountType.AMOUNT,
    };
  }

  return {
    original: price,
    discounted: {
      ...price,
      amount: amount - (amount * discount.off) / 100,
    },
    percentage: discount.off,
    type: BillingDiscountType.PERCENT,
  };
};

export const getHighestDiscountForPrice = (
  price: PricingPlanPrice,
  discounts: Discount[],
) => {
  const discountsForPrice = discounts.filter((d) =>
    d.appliesTo.includes(price.id),
  );

  const [highestDiscount] = discountsForPrice.sort((a, b) => {
    const discountA = calculatePriceDiscount(price, a);
    const discountB = calculatePriceDiscount(price, b);

    const amountA = discountA.original.amount - discountA.discounted.amount;
    const amountB = discountB.original.amount - discountB.discounted.amount;

    return amountB - amountA;
  });

  return highestDiscount;
};

export const getPriceWithHighestDiscount = (
  plans: PricingPlan[],
  discounts: Discount[],
) => {
  const pricesWithDiscounts = plans
    .flatMap((plan) => plan.prices)
    .map((price) => ({
      ...price,
      discounts: discounts.filter((d) => d.appliesTo.includes(price.id)),
    }));

  const [priceWithHighestDiscount] = pricesWithDiscounts.sort((a, b) => {
    const highestDiscountA = getHighestDiscountForPrice(a, discounts);
    const highestDiscountB = getHighestDiscountForPrice(b, discounts);

    const discountA = highestDiscountA
      ? calculatePriceDiscount(a, highestDiscountA)
      : null;
    const discountB = highestDiscountB
      ? calculatePriceDiscount(b, highestDiscountB)
      : null;

    const amountA =
      (discountA?.original.amount ?? 0) - (discountA?.discounted.amount ?? 0);
    const amountB =
      (discountB?.original.amount ?? 0) - (discountB?.discounted.amount ?? 0);

    return amountB - amountA;
  });

  if (!priceWithHighestDiscount) {
    return null;
  }

  return {
    ...priceWithHighestDiscount,
    discount: getHighestDiscountForPrice(priceWithHighestDiscount, discounts),
  };
};
