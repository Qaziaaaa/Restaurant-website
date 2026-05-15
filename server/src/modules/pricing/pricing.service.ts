import { validateAndGetCoupon, calculateDiscount } from '../coupons/coupon.service';

const TAX_RATE = 0.08; // 8% tax rate - can be moved to config

export const calculateItemTotal = (
  basePrice: number,
  quantity: number,
  selectedAddons: { price: number }[],
  selectedVariant?: { price: number }
): number => {
  let unitPrice = basePrice;

  if (selectedVariant) {
    unitPrice = selectedVariant.price;
  }

  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);

  return (unitPrice + addonsTotal) * quantity;
};

export const calculateCartTotals = async (
  items: { itemTotal: number }[],
  couponCode?: string
) => {
  const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
  let discount = 0;

  if (couponCode) {
    try {
      const coupon = await validateAndGetCoupon(couponCode, subtotal);
      if (coupon) {
        discount = calculateDiscount(coupon, subtotal);
      }
    } catch (error) {
      // If coupon validation fails during generic calculation, we ignore or throw depending on strictness.
      // We'll throw so the user knows.
      throw error;
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const tax = Number((discountedSubtotal * TAX_RATE).toFixed(2));
  const total = Number((discountedSubtotal + tax).toFixed(2));

  return { subtotal, discount, tax, total };
};
