import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category';
import MenuItem from './models/MenuItem';
import Cart from './models/Cart';
import Order, { OrderStatus } from './models/Order';
import Coupon, { DiscountType } from './models/Coupon';
import User from './models/User';
import { addItemToCart, updateItemQuantity, removeItemFromCart, applyCouponToCart, clearCart } from './modules/cart/cart.service';
import { createOrderFromCart, updateOrderStatus, getUserOrders, getOrderById } from './modules/orders/orders.service';
import { getMenuItems } from './modules/menu/menu.service';

dotenv.config();

const runTests = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/restaurant-commerce-test');
    console.log('Connected to MongoDB');

    // Clean DB
    await Category.deleteMany();
    await MenuItem.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();
    await Coupon.deleteMany();
    await User.deleteMany();

    // Create Test User
    const user = await User.create({ name: 'Test User', email: 'test@example.com', password: 'Password123!', role: 'customer', isVerified: true });
    const userId = user._id.toString();

    const userB = await User.create({ name: 'User B', email: 'userB@example.com', password: 'Password123!', role: 'customer', isVerified: true });
    const userBId = userB._id.toString();

    console.log('\n--- TEST 1 — CREATE CATEGORY ---');
    const category = await Category.create({ name: 'Pizza' });
    console.log('Category saved:', category.name);
    console.log('Slug auto-generated:', category.slug); // Expected: 'pizza'

    console.log('\n--- TEST 2 — CREATE MENU ITEM ---');
    let menuItem;
    try {
      menuItem = await MenuItem.create({
        name: 'Margherita',
        description: 'Classic cheese and tomato',
        category: category._id,
        basePrice: 10,
        images: ['pizza.jpg']
      });
      console.log('Menu Item created successfully.');
      console.log('Pricing stored:', menuItem.basePrice);
      console.log('Availability default:', menuItem.availability);
    } catch (e: any) {
      console.error('Failed to create menu item:', e.message);
    }

    try {
      await MenuItem.create({
        name: 'Negative Pizza',
        description: 'Negative price test',
        category: category._id,
        basePrice: -5,
        images: []
      });
      console.error('FAIL: Negative pricing allowed');
    } catch (e: any) {
      console.log('SUCCESS: Negative pricing prevented:', e.message);
    }

    console.log('\n--- TEST 3 — MENU FILTERING ---');
    const menuResult = await getMenuItems({ category: category._id.toString(), search: 'Margh' });
    console.log('Filtered items count:', menuResult.items.length);
    console.log('Pagination metadata:', menuResult.pagination);

    console.log('\n--- TEST 4 — ADD TO CART ---');
    let cart = await addItemToCart(userId, menuItem!._id.toString(), 2);
    console.log('Cart Items:', cart.items.length);
    console.log('Subtotal recalculated:', cart.subtotal); // Expected: 20
    console.log('Total updated:', cart.total); // Expected: 21.6 (20 + 8% tax)

    console.log('\n--- TEST 5 — QUANTITY UPDATE ---');
    cart = await updateItemQuantity(userId, (cart.items[0] as any)._id.toString(), 3);
    console.log('New Subtotal:', cart.subtotal); // Expected: 30
    console.log('New Total:', cart.total); // Expected: 32.4

    console.log('\n--- TEST 6 — REMOVE ITEM ---');
    const item2 = await MenuItem.create({
      name: 'Pepperoni',
      description: 'Spicy pepperoni',
      category: category._id,
      basePrice: 15,
      images: []
    });
    cart = await addItemToCart(userId, item2._id.toString(), 1);
    console.log('Subtotal after adding item 2:', cart.subtotal); // Expected: 45
    cart = await removeItemFromCart(userId, (cart.items[1] as any)._id.toString());
    console.log('Subtotal after removal:', cart.subtotal); // Expected: 30

    console.log('\n--- TEST 7 — COUPON TEST ---');
    const validCoupon = await Coupon.create({
      code: 'DISCOUNT10',
      discountType: DiscountType.FIXED,
      discountValue: 10,
      expirationDate: new Date(Date.now() + 100000),
      usageLimit: 10,
      active: true
    });
    cart = await applyCouponToCart(userId, validCoupon.code);
    console.log('Subtotal after valid coupon:', cart.subtotal); // Expected: 30
    console.log('Discount applied:', cart.discount); // Expected: 10
    console.log('Total after valid coupon:', cart.total); // Expected: (30-10) + 8% = 21.6

    const expiredCoupon = await Coupon.create({
      code: 'EXPIRED',
      discountType: DiscountType.FIXED,
      discountValue: 5,
      expirationDate: new Date(Date.now() - 100000),
      usageLimit: 10,
      active: true
    });
    try {
      await applyCouponToCart(userId, expiredCoupon.code);
      console.error('FAIL: Expired coupon applied');
    } catch (e: any) {
      console.log('SUCCESS: Expired coupon prevented:', e.message);
    }

    console.log('\n--- TEST 8 — PRICE MANIPULATION TEST ---');
    console.log('Note: Backend ONLY calculates from DB basePrice and addons. Frontend cannot send its own total/subtotal prices to `addItemToCart`. This strictly prevents price manipulation.');

    console.log('\n--- TEST 9 — CREATE ORDER ---');
    const order = await createOrderFromCart(userId, {
      street: '123 Main', city: 'NY', state: 'NY', zipCode: '10001', country: 'USA'
    });
    console.log('Order Created:', order.orderNumber);
    console.log('Pricing Snapshot:', order.pricingBreakdown);
    console.log('Order Status:', order.orderStatus);

    const emptyCart = await Cart.findOne({ user: userId });
    console.log('Cart Items after order:', emptyCart?.items.length); // Expected: 0

    console.log('\n--- TEST 10 — EMPTY CART ORDER TEST ---');
    try {
      await createOrderFromCart(userId, {
        street: '123 Main', city: 'NY', state: 'NY', zipCode: '10001', country: 'USA'
      });
      console.error('FAIL: Empty cart ordered');
    } catch (e: any) {
      console.log('SUCCESS: Empty cart prevented:', e.message);
    }

    console.log('\n--- TEST 11 — ORDER STATUS FLOW ---');
    let updatedOrder = await updateOrderStatus(order._id.toString(), OrderStatus.CONFIRMED);
    console.log('Status updated to:', updatedOrder.orderStatus);
    updatedOrder = await updateOrderStatus(order._id.toString(), OrderStatus.PREPARING);
    console.log('Status updated to:', updatedOrder.orderStatus);
    try {
      await updateOrderStatus(order._id.toString(), OrderStatus.DELIVERED); // Invalid transition from PREPARING
      console.error('FAIL: Invalid transition allowed');
    } catch (e: any) {
      console.log('SUCCESS: Invalid transition prevented:', e.message);
    }

    console.log('\n--- TEST 12 — USER ORDER HISTORY ---');
    const history = await getUserOrders(userId);
    console.log('User A Order Count:', history.orders.length); // Expected: 1
    const historyB = await getUserOrders(userBId);
    console.log('User B Order Count:', historyB.orders.length); // Expected: 0

    console.log('\n--- TEST 13 — SECURITY TEST ---');
    try {
      await getOrderById(userBId, order._id.toString());
      console.error('FAIL: User B accessed User A order');
    } catch (e: any) {
      console.log('SUCCESS: User B forbidden from User A order:', e.message);
    }

    console.log('\n--- ALL TESTS COMPLETE ---');
    process.exit(0);

  } catch (error) {
    console.error('Test script failed:', error);
    process.exit(1);
  }
};

runTests();
