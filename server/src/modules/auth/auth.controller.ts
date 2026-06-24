import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import User from '../../models/User';
import { UserRole } from '../../constants';
import Session from '../../models/Session';
import { AppError } from '../../middlewares/errorMiddleware';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { ApiResponse } from '../../utils/ApiResponse';
import { setTokenCookies, clearTokenCookies, createSession, logAuthEvent } from './auth.service';
import crypto from 'crypto';
import { env } from '../../config/env';
import { sendEmail } from '../../utils/mailer';


export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError('User already exists', 400);
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');

  const user = await User.create({
    name,
    email,
    password,
    phone,
    verificationToken: crypto.createHash('sha256').update(verificationToken).digest('hex'),
  });

  const verifyUrl = `${env.FRONTEND_URL}/verify-email/${verificationToken}`;
  const message = `
    <h1>Welcome to Savoria!</h1>
    <p>Thank you for registering. Please verify your email by clicking the link below:</p>
    <a href="${verifyUrl}" target="_blank">Verify Email</a>
    <p>This link will expire in 24 hours.</p>
  `;

  try {
    await sendEmail(user.email, 'Savoria - Verify Your Email', message);
  } catch (err) {
    // If email fails, still create user but log error
    console.error('Failed to send verification email:', err);
  }

  await logAuthEvent('REGISTER', user._id.toString(), req.ip, req.get('user-agent'));

  res.status(201).json(
    ApiResponse.success(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      'User registered successfully. Please check your email to verify your account.'
    )
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (user && user.isLocked()) {
    const remaining = Math.ceil((user.lockUntil!.getTime() - Date.now()) / 60000);
    throw new AppError(`Account locked. Try again in ${remaining} minutes`, 429);
  }

  if (!user || !(await user.comparePassword(password))) {
    if (user) {
      await user.incrementLoginAttempts();
    }
    await logAuthEvent('LOGIN_FAILED', undefined, req.ip, req.get('user-agent'), { email });
    throw new AppError('Invalid email or password', 401);
  }

  if (!user.isVerified && user.role !== UserRole.ADMIN) {
    throw new AppError('Please verify your email before logging in', 403);
  }

  await user.resetLoginAttempts();

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

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

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    // We return success even if user doesn't exist to prevent email enumeration
    return res.json(ApiResponse.success(null, 'If that email exists, a reset link has been sent.'));
  }

  // Generate a random reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash the token and set expiration (10 minutes)
  user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save({ validateBeforeSave: false });

  // Send the email
  const resetUrl = `${env.FRONTEND_URL}/reset-password/${resetToken}`;
  const message = `
    <h1>Password Reset Request</h1>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetUrl}" target="_blank">Reset Password</a>
    <p>If you didn't request this, you can safely ignore this email.</p>
    <p>This link will expire in 10 minutes.</p>
  `;

  try {
    await sendEmail(user.email, 'Savoria - Password Reset', message);
    res.json(ApiResponse.success(null, 'If that email exists, a reset link has been sent.'));
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError('There was an error sending the email. Try again later!', 500);
  }
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  // Hash the incoming token to match the database
  const hashedToken = crypto.createHash('sha256').update(String(token)).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new AppError('Token is invalid or has expired', 400);
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  
  await user.save();

  res.json(ApiResponse.success(null, 'Password has been reset successfully. You can now log in.'));
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;

  const hashedToken = crypto.createHash('sha256').update(String(token)).digest('hex');
  const user = await User.findOne({
    verificationToken: hashedToken,
  });

  if (!user) {
    throw new AppError('Invalid or expired verification token', 400);
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.json(ApiResponse.success(null, 'Email verified successfully. You can now log in.'));
});

export const resendVerification = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json(ApiResponse.success(null, 'If that email exists, a verification link has been sent.'));
  }

  if (user.isVerified) {
    return res.json(ApiResponse.success(null, 'Email is already verified. You can log in.'));
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');
  user.verificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
  await user.save({ validateBeforeSave: false });

  const verifyUrl = `${env.FRONTEND_URL}/verify-email/${verificationToken}`;
  const message = `
    <h1>Email Verification</h1>
    <p>Click the link below to verify your email:</p>
    <a href="${verifyUrl}" target="_blank">Verify Email</a>
    <p>This link will expire in 24 hours.</p>
  `;

  try {
    await sendEmail(user.email, 'Savoria - Verify Your Email', message);
    res.json(ApiResponse.success(null, 'If that email exists, a verification link has been sent.'));
  } catch (err) {
    user.verificationToken = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError('There was an error sending the email. Try again later!', 500);
  }
});
