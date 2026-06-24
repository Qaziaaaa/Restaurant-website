import { Router } from 'express';
import { createOrder, getMyOrders, getOrderDetails, createPayment, getAllOrders, updateOrderStatus, refundOrder, getDashboardStats } from './orders.controller';
import { validate } from '../../middlewares/validateMiddleware';
import { createOrderSchema } from './orders.validator';
import { protect, authorize } from '../../middlewares/authMiddleware';

const router = Router();

router.use(protect);

router.post('/', validate(createOrderSchema), createOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrderDetails);
router.post('/:orderId/payment', createPayment);

// Admin routes
router.get('/admin/all', authorize('admin', 'manager'), getAllOrders);
router.get('/admin/stats', authorize('admin', 'manager'), getDashboardStats);
router.patch('/admin/:id/status', authorize('admin', 'manager', 'chef'), updateOrderStatus);
router.post('/admin/:id/refund', authorize('admin'), refundOrder);

export default router;
