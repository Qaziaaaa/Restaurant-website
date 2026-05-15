import express from 'express';
import { register, login, logout, refresh, getMe } from './auth.controller';
import { validate } from '../../middlewares/validateMiddleware';
import { registerSchema, loginSchema } from './auth.validator';
import { protect } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refresh);
router.get('/me', protect, getMe);

export default router;
