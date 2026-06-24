import express from 'express';
import { register, login, logout, refresh, getMe, forgotPassword, resetPassword, verifyEmail, resendVerification } from './auth.controller';
import { validate } from '../../middlewares/validateMiddleware';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, verifyEmailSchema, resendVerificationSchema } from './auth.validator';
import { protect } from '../../middlewares/authMiddleware';
import { authLimiter, forgotPasswordLimiter, registerLimiter } from '../../middlewares/rateLimiter';

const router = express.Router();

router.post('/register', registerLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refresh);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPasswordLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', forgotPasswordLimiter, validate(resendVerificationSchema), resendVerification);

export default router;
