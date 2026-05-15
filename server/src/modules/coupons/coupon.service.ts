import Coupon, { ICoupon, DiscountType } from '../../models/Coupon';

export const validateAndGetCoupon = async (code: string, subtotal: number): Promise<ICoupon | null> => {
  if (!code) return null;

  const coupon = await Coupon.findOne({ code: code.toUpperCase(), active: true });

  if (!coupon) {
    throw new Error('Invalid or expired coupon code');
  }

  if (coupon.expirationDate < new Date()) {
    throw new Error('Coupon has expired');
  }

  if (coupon.timesUsed >= coupon.usageLimit) {
    throw new Error('Coupon usage limit reached');
  }

  if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
    throw new Error(`Minimum order value of $${coupon.minOrderValue} required for this coupon`);
  }

  return coupon;
};

export const calculateDiscount = (coupon: ICoupon, subtotal: number): number => {
  if (coupon.discountType === DiscountType.FIXED) {
    return Math.min(coupon.discountValue, subtotal);
  } else if (coupon.discountType === DiscountType.PERCENTAGE) {
    return (subtotal * coupon.discountValue) / 100;
  }
  return 0;
};
