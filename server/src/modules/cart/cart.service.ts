import Cart, { ICart } from '../../models/Cart';
import MenuItem from '../../models/MenuItem';
import { calculateItemTotal, calculateCartTotals } from '../pricing/pricing.service';
import mongoose from 'mongoose';

export const getCartByUserId = async (userId: string) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.menuItem', 'name images basePrice');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

export const addItemToCart = async (
  userId: string,
  menuItemId: string,
  quantity: number,
  selectedAddonIds: string[] = [],
  selectedVariantId?: string
) => {
  const cart = await getCartByUserId(userId);
  const menuItem = await MenuItem.findById(menuItemId);
  if (!menuItem || !menuItem.availability) {
    throw new Error('Menu item not available');
  }

  // Find variant and addons prices
  const variant = selectedVariantId 
    ? menuItem.variants.find(v => (v as any)._id.toString() === selectedVariantId)
    : undefined;

  const addons = menuItem.addons.filter(a => selectedAddonIds.includes((a as any)._id.toString()));

  const itemTotal = calculateItemTotal(
    menuItem.basePrice,
    quantity,
    addons,
    variant
  );

  // Check if identical item exists (same item, variant, addons)
  const sortedInputAddons = [...selectedAddonIds].sort();
  
  const existingItemIndex = cart.items.findIndex(item => {
    const itemAddons = item.selectedAddons.map(id => id.toString()).sort();
    return item.menuItem.toString() === menuItemId &&
           item.selectedVariant?.toString() === selectedVariantId &&
           JSON.stringify(itemAddons) === JSON.stringify(sortedInputAddons);
  });

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity;
    cart.items[existingItemIndex].itemTotal += itemTotal;
  } else {
    cart.items.push({
      menuItem: new mongoose.Types.ObjectId(menuItemId),
      quantity,
      selectedAddons: selectedAddonIds.map(id => new mongoose.Types.ObjectId(id)),
      selectedVariant: selectedVariantId ? new mongoose.Types.ObjectId(selectedVariantId) : undefined,
      itemTotal
    });
  }

  return await recalculateAndSaveCart(cart);
};

export const removeItemFromCart = async (userId: string, cartItemId: string) => {
  const cart = await getCartByUserId(userId);
  cart.items = cart.items.filter(item => (item as any)._id.toString() !== cartItemId);
  return await recalculateAndSaveCart(cart);
};

export const updateItemQuantity = async (userId: string, cartItemId: string, quantity: number) => {
  const cart = await getCartByUserId(userId);
  const itemIndex = cart.items.findIndex(item => (item as any)._id.toString() === cartItemId);
  
  if (itemIndex === -1) throw new Error('Item not in cart');
  
  if (quantity <= 0) {
    return removeItemFromCart(userId, cartItemId);
  }

  const item = cart.items[itemIndex];
  // Re-calculate item total based on new quantity
  const unitPrice = item.itemTotal / item.quantity; // quick way since total = unit * qty
  item.quantity = quantity;
  item.itemTotal = unitPrice * quantity;

  return await recalculateAndSaveCart(cart);
};

export const applyCouponToCart = async (userId: string, couponCode: string) => {
  const cart = await getCartByUserId(userId);
  
  // Validate coupon before applying to ensure it exists and is valid for current subtotal
  await calculateCartTotals(cart.items, couponCode);
  
  cart.couponCode = couponCode;
  return await recalculateAndSaveCart(cart);
};

export const clearCart = async (userId: string) => {
  const cart = await getCartByUserId(userId);
  cart.items = [];
  cart.couponCode = undefined;
  return await recalculateAndSaveCart(cart);
};

const recalculateAndSaveCart = async (cart: ICart) => {
  try {
    const totals = await calculateCartTotals(cart.items, cart.couponCode);
    cart.subtotal = totals.subtotal;
    cart.discount = totals.discount;
    cart.tax = totals.tax;
    cart.total = totals.total;
  } catch (error) {
    // If coupon became invalid, remove it and recalculate
    cart.couponCode = undefined;
    const totals = await calculateCartTotals(cart.items);
    cart.subtotal = totals.subtotal;
    cart.discount = totals.discount;
    cart.tax = totals.tax;
    cart.total = totals.total;
  }
  
  await cart.save();
  return cart.populate('items.menuItem', 'name images basePrice');
};
