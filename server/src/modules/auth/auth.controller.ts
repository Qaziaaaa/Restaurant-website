import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import User from '../../models/User';
import { AppError } from '../../middlewares/errorMiddleware';
import { generateToken } from '../../utils/jwt';
import { ApiResponse } from '../../utils/ApiResponse';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new AppError('User already exists', 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
  });

  if (user) {
    const token = generateToken(user._id as string);
    res.status(201).json(
      ApiResponse.success(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        },
        'User registered successfully'
      )
    );
  } else {
    throw new AppError('Invalid user data', 400);
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.comparePassword(password))) {
    const token = generateToken(user._id as string);
    res.json(
      ApiResponse.success(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        },
        'Logged in successfully'
      )
    );
  } else {
    throw new AppError('Invalid email or password', 401);
  }
});
