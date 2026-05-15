import express from 'express';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/users/users.routes';
import menuRoutes from '../modules/menu/menu.routes';
import cartRoutes from '../modules/cart/cart.routes';
import orderRoutes from '../modules/orders/orders.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/menu', menuRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);

export default router;
