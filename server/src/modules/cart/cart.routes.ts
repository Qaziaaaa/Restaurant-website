import { Router } from 'express';
import { getCart, addItem, removeItem, updateQuantity, applyCoupon, clear } from './cart.controller';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

router.use(protect);

router.get('/', getCart);
router.post('/items', addItem);
router.put('/items/:itemId', updateQuantity);
router.delete('/items/:itemId', removeItem);
router.post('/coupon', applyCoupon);
router.delete('/', clear);

export default router;
