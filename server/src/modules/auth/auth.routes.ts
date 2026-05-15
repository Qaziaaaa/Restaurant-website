import express from 'express';
import { register, login } from './auth.controller';
import { validate } from '../../middlewares/validateMiddleware';
import { registerSchema, loginSchema } from './auth.validator';
import { protect } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Temporary protected route for testing
router.get('/me', protect, (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

export default router;
