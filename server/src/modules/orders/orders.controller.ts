import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import * as ordersService from './orders.service';
import { createPaymentIntent } from '../../services/payment.service';

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { deliveryAddress } = req.body;
  
  if (!deliveryAddress) {
    res.status(400);
    throw new Error('Delivery address is required');
  }

  const order = await ordersService.createOrderFromCart(req.user._id as string, deliveryAddress);
  res.status(201).json(ApiResponse.success(order, 'Order created successfully'));
});

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const result = await ordersService.getUserOrders(
    req.user._id as string,
    page ? parseInt(page as string, 10) : 1,
    limit ? parseInt(limit as string, 10) : 10
  );
  res.json(ApiResponse.success(result, 'Orders fetched successfully'));
});

export const getOrderDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await ordersService.getOrderById(req.user._id as string, id as string);
  res.json(ApiResponse.success(order, 'Order details fetched'));
});

export const createPayment = asyncHandler(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await ordersService.getOrderById(req.user._id as string, orderId as string);

  const paymentData = await createPaymentIntent(order as any);
  res.json(ApiResponse.success(paymentData, 'Payment intent created'));
});
