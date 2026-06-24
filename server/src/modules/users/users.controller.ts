import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { AppError } from '../../middlewares/errorMiddleware';
import * as usersService from './users.service';
import User from '../../models/User';

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  res.json(ApiResponse.success(req.user, 'Profile fetched'));
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  const updates: any = {};
  if (name) updates.name = name;
  if (email) updates.email = email;
  if (phone !== undefined) updates.phone = phone;

  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.json(ApiResponse.success(user, 'Profile updated'));
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new AppError('Current password is incorrect', 400);
  }

  user.password = newPassword;
  await user.save();

  res.json(ApiResponse.success(null, 'Password changed successfully'));
});

export const getAddresses = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);
  res.json(ApiResponse.success(user?.addresses || [], 'Addresses fetched'));
});

export const createAddress = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const address = req.body;
  if (address.isDefault) {
    user.addresses.forEach((a: any) => { a.isDefault = false; });
  }

  user.addresses.push(address);
  await user.save();

  res.status(201).json(ApiResponse.success(user.addresses, 'Address created'));
});

export const updateAddress = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const address = (user.addresses as any).id(id);
  if (!address) {
    throw new AppError('Address not found', 404);
  }

  const updates = req.body;
  if (updates.isDefault) {
    user.addresses.forEach((a: any) => { a.isDefault = false; });
  }

  Object.assign(address, updates);
  await user.save();

  res.json(ApiResponse.success(user.addresses, 'Address updated'));
});

export const deleteAddress = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  (user.addresses as any).id(id).deleteOne();
  await user.save();

  res.json(ApiResponse.success(user.addresses, 'Address deleted'));
});

export const deleteAccount = asyncHandler(async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.user._id);
  res.json(ApiResponse.success(null, 'Account deleted'));
});
