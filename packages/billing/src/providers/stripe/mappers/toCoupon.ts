import type { Coupon, PromotionCode } from "../../../types";
import type Stripe from "stripe";

export const toCoupon = (coupon: Stripe.Coupon): Coupon => {
  return {
    id: coupon.id,
    amountOff: coupon.amount_off,
    percentOff: coupon.percent_off,
    currency: coupon.currency,
  };
};

export const toPromotionCode = (
  promotionCode: Stripe.PromotionCode,
): PromotionCode => {
  return {
    id: promotionCode.id,
    code: promotionCode.code,
    coupon: toCoupon(promotionCode.coupon),
    maxRedemptions: promotionCode.max_redemptions,
    timesRedeemed: promotionCode.times_redeemed,
  };
};
