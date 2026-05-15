import { Router } from 'express';
import { createOrder, getMyOrders, getOrderDetails, createPayment } from './orders.controller';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

router.use(protect);

router.post('/', createOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrderDetails);
router.post('/:orderId/payment', createPayment);

export default router;
