import Redis from 'ioredis';
import logger from '../utils/logger';

class CacheService {
  private redis: Redis | null = null;
  private readonly DEFAULT_TTL = 3600; // 1 hour

  constructor() {
    try {
      this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
        maxRetriesPerRequest: 3,
      });

      this.redis.on('error', (err) => {
        logger.error('Redis connection error:', err);
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
}

export const cacheService = new CacheService();
