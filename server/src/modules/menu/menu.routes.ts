import { Router } from 'express';
import { getAllMenu, getMenuById, createMenu, updateMenu, deleteMenu } from './menu.controller';
import { cacheMiddleware } from '../../middlewares/cacheMiddleware';
import { protect, authorize } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', cacheMiddleware('menu_all', 300), getAllMenu);
router.get('/:id', cacheMiddleware('menu_item', 600), getMenuById);

// Admin routes
router.use(protect);
router.use(authorize('admin', 'manager'));

router.post('/', createMenu);
router.patch('/:id', updateMenu);
router.delete('/:id', deleteMenu);
// router.put('/:id', requireAuth, requireAdmin, updateMenu);
// router.delete('/:id', requireAuth, requireAdmin, deleteMenu);

export default router;
