import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import User from '../../models/User';
import Session from '../../models/Session';
import { AppError } from '../../middlewares/errorMiddleware';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { ApiResponse } from '../../utils/ApiResponse';
import { setTokenCookies, clearTokenCookies, createSession, logAuthEvent } from './auth.service';

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

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  await createSession(user._id.toString(), refreshToken, req.ip, req.get('user-agent'));
  setTokenCookies(res, accessToken, refreshToken);

  await logAuthEvent('REGISTER', user._id.toString(), req.ip, req.get('user-agent'));

  res.status(201).json(
    ApiResponse.success(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken,
      },
      'User registered successfully'
    )
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    await logAuthEvent('LOGIN_FAILED', undefined, req.ip, req.get('user-agent'), { email });
    throw new AppError('Invalid email or password', 401);
  }

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  // Clear any existing sessions if you want single-device login, 
  // or just create a new one for multi-device support.
  await createSession(user._id.toString(), refreshToken, req.ip, req.get('user-agent'));
  setTokenCookies(res, accessToken, refreshToken);

  await logAuthEvent('LOGIN', user._id.toString(), req.ip, req.get('user-agent'));

  res.json(
    ApiResponse.success(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken,
      },
      'Logged in successfully'
    )
  );
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    // Revoke the session in DB
    const session = await Session.findOneAndUpdate({ refreshToken }, { isRevoked: true });
    if (session) {
      await logAuthEvent('LOGOUT', session.user.toString(), req.ip, req.get('user-agent'));
    }
  }

  clearTokenCookies(res);
  res.json(ApiResponse.success(null, 'Logged out successfully'));
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken: oldRefreshToken } = req.cookies;

  if (!oldRefreshToken) {
    throw new AppError('Refresh token missing', 401);
  }

  try {
    const decoded = verifyRefreshToken(oldRefreshToken) as { id: string };
    
    // Check if session exists and is not revoked
    const session = await Session.findOne({ refreshToken: oldRefreshToken, isRevoked: false });
    if (!session) {
      throw new AppError('Session expired or revoked', 401);
    }

    // Token Rotation: Issue new tokens and update session
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError('User no longer exists', 401);
    }

    const newAccessToken = generateAccessToken(user._id.toString());
    const newRefreshToken = generateRefreshToken(user._id.toString());

    session.refreshToken = newRefreshToken;
    session.lastUsedAt = new Date();
    await session.save();

    setTokenCookies(res, newAccessToken, newRefreshToken);

    res.json(ApiResponse.success({ accessToken: newAccessToken }, 'Token refreshed successfully'));
  } catch (error) {
    throw new AppError('Invalid refresh token', 401);
  }
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.json(ApiResponse.success(req.user, 'User profile fetched successfully'));
});
