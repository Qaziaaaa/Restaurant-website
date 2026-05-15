import { Router } from 'express';
import { getAllMenu, getMenuById } from './menu.controller';
import { cacheMiddleware } from '../../middlewares/cacheMiddleware';

const router = Router();

router.get('/', cacheMiddleware('menu_all', 300), getAllMenu);
router.get('/:id', cacheMiddleware('menu_item', 600), getMenuById);

// Admin routes for future
// router.post('/', requireAuth, requireAdmin, validateCreateMenu, createMenu);
// router.put('/:id', requireAuth, requireAdmin, updateMenu);
// router.delete('/:id', requireAuth, requireAdmin, deleteMenu);

export default router;
