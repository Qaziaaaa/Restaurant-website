import { Response } from 'express';
import { env } from '../../config/env';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import Session from '../../models/Session';
import AuditLog from '../../models/AuditLog';

export const logAuthEvent = async (action: string, userId?: string, ip?: string, userAgent?: string, metadata?: any) => {
  await AuditLog.create({
    user: userId,
    action,
    ipAddress: ip,
    userAgent,
    metadata,
  });
};

export const setTokenCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const cookieOptions: any = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
  };

  // Set Access Token Cookie (15 min)
  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  // Set Refresh Token Cookie (7 days)
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearTokenCookies = (res: Response) => {
  res.cookie('accessToken', '', { maxAge: 0 });
  res.cookie('refreshToken', '', { maxAge: 0 });
};

export const createSession = async (userId: string, refreshToken: string, ip?: string, userAgent?: string) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days matching REFRESH_EXPIRES_IN

  return await Session.create({
    user: userId,
    refreshToken,
    ipAddress: ip,
    userAgent,
    expiresAt,
  });
};
