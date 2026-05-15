import Order, { IOrder, OrderStatus, PaymentStatus } from '../../models/Order';
import Cart from '../../models/Cart';
import MenuItem from '../../models/MenuItem';
import mongoose from 'mongoose';

const generateOrderNumber = () => {
  const prefix = 'ORD';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

export const createOrderFromCart = async (
  userId: string,
  deliveryAddress: IOrder['deliveryAddress']
) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.menuItem');
  
  if (!cart || cart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  // Validate cart items availability before ordering
  const orderItems = [];
  for (const cartItem of cart.items) {
    const menuItem = cartItem.menuItem as any; // Populated document
    
    if (!menuItem.availability) {
      throw new Error(`Item ${menuItem.name} is currently unavailable`);
    }

    // Capture Snapshots
    const selectedVariantName = cartItem.selectedVariant 
      ? menuItem.variants.id(cartItem.selectedVariant)?.name 
      : undefined;

    const selectedVariantPrice = cartItem.selectedVariant 
      ? menuItem.variants.id(cartItem.selectedVariant)?.price 
      : undefined;

    const addonsSnapshot = cartItem.selectedAddons.map(addonId => {
      const addon = menuItem.addons.id(addonId);
      return { name: addon.name, price: addon.price };
    });

    orderItems.push({
      menuItem: menuItem._id,
      nameSnapshot: menuItem.name,
      quantity: cartItem.quantity,
      priceSnapshot: menuItem.basePrice,
      selectedAddons: addonsSnapshot,
      selectedVariant: selectedVariantName ? { name: selectedVariantName, price: selectedVariantPrice } : undefined,
      itemTotal: cartItem.itemTotal
    });
  }

  const orderNumber = generateOrderNumber();

  // Transaction-ready architecture: In a real prod environment with Replica Sets, 
  // you would wrap the order creation and cart clearing in a mongoose session transaction.
  
  const order = await Order.create({
    orderNumber,
    user: userId,
    items: orderItems,
    pricingBreakdown: {
      subtotal: cart.subtotal,
      tax: cart.tax,
      discount: cart.discount,
      total: cart.total
    },
    deliveryAddress,
    paymentStatus: PaymentStatus.PENDING,
    orderStatus: OrderStatus.PENDING
  });

  // Clear cart after successful order creation
  cart.items = [];
  cart.couponCode = undefined;
  cart.subtotal = 0;
  cart.tax = 0;
  cart.discount = 0;
  cart.total = 0;
  await cart.save();

  return order;
};

export const getUserOrders = async (userId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [orders, total] = await Promise.all([
    Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Order.countDocuments({ user: userId })
  ]);

  return {
    orders,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getOrderById = async (userId: string, orderId: string) => {
  const order = await Order.findOne({ _id: orderId, user: userId }).lean();
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

// For Admin Use
export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  const order = await Order.findByIdAndUpdate(orderId, { orderStatus: status }, { new: true });
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};
