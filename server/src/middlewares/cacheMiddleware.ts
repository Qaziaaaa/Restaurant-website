import { Request, Response, NextFunction } from 'express';
import { cacheService } from '../services/cache.service';
import { ApiResponse } from '../utils/ApiResponse';
import logger from '../utils/logger';

export const cacheMiddleware = (key: string, ttl?: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Generate dynamic key if needed (e.g., query params)
    const cacheKey = req.originalUrl || key;

    const cachedData = await cacheService.get(cacheKey);

    if (cachedData) {
      logger.info(`Cache hit for: ${cacheKey}`);
      return res.json(ApiResponse.success(cachedData, 'Data fetched from cache'));
    }

    // Modify res.json to capture and cache response
    const originalJson = res.json;
    res.json = function (body) {
      if (res.statusCode === 200 && body.success) {
        cacheService.set(cacheKey, body.data, ttl);
      }
      return originalJson.call(this, body);
    };

    next();
  };
};
