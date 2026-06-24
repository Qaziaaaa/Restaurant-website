import express from 'express';
import { getProfile, updateProfile, changePassword, getAddresses, createAddress, updateAddress, deleteAddress, deleteAccount } from './users.controller';
import { validate } from '../../middlewares/validateMiddleware';
import { updateProfileSchema, changePasswordSchema, createAddressSchema, updateAddressSchema, deleteAddressSchema } from './users.validator';
import { protect } from '../../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);

router.get('/me', getProfile);
router.patch('/me', validate(updateProfileSchema), updateProfile);
router.patch('/me/password', validate(changePasswordSchema), changePassword);
router.delete('/me', deleteAccount);
router.get('/me/addresses', getAddresses);
router.post('/me/addresses', validate(createAddressSchema), createAddress);
router.put('/me/addresses/:id', validate(updateAddressSchema), updateAddress);
router.delete('/me/addresses/:id', validate(deleteAddressSchema), deleteAddress);

export default router;
