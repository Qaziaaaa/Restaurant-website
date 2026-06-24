import Redis from 'ioredis';
import { env } from '../config/env';
import logger from '../utils/logger';

class CacheService {
  private redis: Redis | null = null;
  private readonly DEFAULT_TTL = 3600; // 1 hour

  constructor() {
    if (env.DISABLE_REDIS === 'true') {
      logger.info('Redis is disabled via environment flag.');
      return;
    }
    try {
      this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
        maxRetriesPerRequest: 3,
      });

      this.redis.on('error', (err: any) => {
        if (err.code !== 'ECONNREFUSED') {
          logger.error('Redis error:', err);
        }
      });

      this.redis.on('connect', () => {
        logger.info('Connected to Redis successfully');
      });
    } catch (error) {
      logger.error('Redis initialization failed:', error);
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    if (!this.redis) return null;
    try {
      const data = await this.redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error(`Cache GET error for key ${key}:`, error);
      return null;
    }
  }

  public async set(key: string, value: any, ttl: number = this.DEFAULT_TTL): Promise<void> {
    if (!this.redis) return;
    try {
      await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    } catch (error) {
      logger.error(`Cache SET error for key ${key}:`, error);
    }
  }

  public async del(key: string): Promise<void> {
    if (!this.redis) return;
    try {
      await this.redis.del(key);
    } catch (error) {
      logger.error(`Cache DEL error for key ${key}:`, error);
    }
  }

  public async flush(): Promise<void> {
    if (!this.redis) return;
    await this.redis.flushall();
  }

  public getStatus(): string {
    if (!this.redis) return 'not_initialized';
    return this.redis.status; // 'connecting', 'connect', 'ready', 'end', 'wait'
  }
}

export const cacheService = new CacheService();
