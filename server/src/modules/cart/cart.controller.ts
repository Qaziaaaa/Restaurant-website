import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import * as cartService from './cart.service';

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.getCartByUserId(req.user._id as string);
  res.json(ApiResponse.success(cart, 'Cart fetched successfully'));
});

export const addItem = asyncHandler(async (req: Request, res: Response) => {
  const { menuItemId, quantity, selectedAddonIds, selectedVariantId } = req.body;
  const cart = await cartService.addItemToCart(
    req.user._id as string,
    menuItemId,
    quantity,
    selectedAddonIds,
    selectedVariantId
  );
  res.json(ApiResponse.success(cart, 'Item added to cart'));
});

export const removeItem = asyncHandler(async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const cart = await cartService.removeItemFromCart(req.user._id as string, itemId as string);
  res.json(ApiResponse.success(cart, 'Item removed from cart'));
});

export const updateQuantity = asyncHandler(async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const cart = await cartService.updateItemQuantity(req.user._id as string, itemId as string, quantity);
  res.json(ApiResponse.success(cart, 'Cart updated'));
});

export const applyCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;
  const cart = await cartService.applyCouponToCart(req.user._id as string, code);
  res.json(ApiResponse.success(cart, 'Coupon applied'));
});

export const clear = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.clearCart(req.user._id as string);
  res.json(ApiResponse.success(cart, 'Cart cleared'));
});
