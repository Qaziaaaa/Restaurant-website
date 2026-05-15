import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import User from '../models/User';
import { AppError } from './errorMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // Optionally check for token in cookies (if you want to support both)
  else if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return next(new AppError('Not authorized, please login', 401));
  }

  try {
    const decoded = verifyAccessToken(token) as JwtPayload;
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return next(new AppError('User belonging to this token no longer exists', 401));
    }

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired, please refresh', 401));
    }
    return next(new AppError('Not authorized, token failed', 401));
  }
});

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError(`User role ${req.user?.role} is not authorized to access this route`, 403));
    }
    next();
  };
};
