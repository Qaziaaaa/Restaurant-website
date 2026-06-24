import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import * as ordersService from './orders.service';
import { createPaymentIntent, createRefund } from '../../services/payment.service';
import Order from '../../models/Order';

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { items, deliveryAddress } = req.body;
  
  if (!deliveryAddress) {
    res.status(400);
    throw new Error('Delivery address is required');
  }

  const order = items && items.length > 0
    ? await ordersService.createOrderFromItems(req.user._id as string, items, deliveryAddress)
    : await ordersService.createOrderFromCart(req.user._id as string, deliveryAddress);

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
  const id = String(req.params.id);
  const order = await ordersService.getOrderById(req.user._id as string, id);
  res.json(ApiResponse.success(order, 'Order details fetched'));
});

export const createPayment = asyncHandler(async (req: Request, res: Response) => {
  const orderId = String(req.params.orderId);
  const order = await ordersService.getOrderById(req.user._id as string, orderId);

  const paymentData = await createPaymentIntent(order as any);
  res.json(ApiResponse.success(paymentData, 'Payment intent created'));
});

// Admin endpoints
export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, status, paymentStatus, dateFrom, dateTo } = req.query;
  const filter: any = {};

  if (status) filter.orderStatus = String(status);
  if (paymentStatus) filter.paymentStatus = String(paymentStatus);
  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) filter.createdAt.$gte = new Date(String(dateFrom));
    if (dateTo) filter.createdAt.$lte = new Date(String(dateTo));
  }

  const pageNum = page ? parseInt(page as string, 10) : 1;
  const limitNum = limit ? parseInt(limit as string, 10) : 20;
  const skip = (pageNum - 1) * limitNum;

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('user', 'name email')
      .lean(),
    Order.countDocuments(filter),
  ]);

  res.json(
    ApiResponse.success(
      {
        orders,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      },
      'Orders fetched successfully'
    )
  );
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { status } = req.body;

  const order = await ordersService.updateOrderStatus(id, status);
  res.json(ApiResponse.success(order, 'Order status updated'));
});

export const refundOrder = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  const refund = await createRefund(order);
  res.json(ApiResponse.success(refund, 'Refund processed successfully'));
});

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    todayOrders,
    weekOrders,
    monthOrders,
    statusCounts,
    popularItems,
  ] = await Promise.all([
    Order.find({ createdAt: { $gte: startOfDay } }).lean(),
    Order.find({ createdAt: { $gte: startOfWeek } }).lean(),
    Order.find({ createdAt: { $gte: startOfMonth } }).lean(),
    Order.aggregate([
      { $group: { _id: '$orderStatus', count: { $sum: 1 } } },
    ]),
    Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.nameSnapshot', count: { $sum: '$items.quantity' }, revenue: { $sum: { $multiply: ['$items.itemTotal', '$items.quantity'] } } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),
  ]);

  const calcRevenue = (orders: any[]) =>
    orders.reduce((sum, o) => sum + (o.pricingBreakdown?.total || 0), 0);

  res.json(
    ApiResponse.success(
      {
        revenue: {
          today: calcRevenue(todayOrders),
          thisWeek: calcRevenue(weekOrders),
          thisMonth: calcRevenue(monthOrders),
        },
        orderCounts: {
          today: todayOrders.length,
          thisWeek: weekOrders.length,
          thisMonth: monthOrders.length,
          total: await Order.countDocuments(),
        },
        ordersByStatus: statusCounts.reduce((acc: any, s: any) => {
          acc[s._id] = s.count;
          return acc;
        }, {}),
        popularItems,
        averageOrderValue: monthOrders.length > 0 ? calcRevenue(monthOrders) / monthOrders.length : 0,
      },
      'Dashboard stats fetched successfully'
    )
  );
});
