import { Router } from 'express';
import { getAllMenu, getMenuById } from './menu.controller';

const router = Router();

router.get('/', getAllMenu);
router.get('/:id', getMenuById);

// Admin routes for future
// router.post('/', requireAuth, requireAdmin, validateCreateMenu, createMenu);
// router.put('/:id', requireAuth, requireAdmin, updateMenu);
// router.delete('/:id', requireAuth, requireAdmin, deleteMenu);

export default router;
