import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { env } from '../config/env';
import logger from '../utils/logger';

const isRedisDisabled = env.DISABLE_REDIS === 'true';

let redisConnection: IORedis | null = null;
let notificationQueue: Queue | null = null;
let emailQueue: Queue | null = null;

if (!isRedisDisabled) {
  redisConnection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null,
    enableOfflineQueue: false,
  });

  redisConnection.on('error', () => {
    // Silently handle redis errors for queues in local dev
  });

  notificationQueue = new Queue('notifications', {
    connection: redisConnection,
  });

  emailQueue = new Queue('emails', {
    connection: redisConnection,
  });
}

// Workers for background processing
export const startWorkers = () => {
  if (isRedisDisabled || !redisConnection) {
    logger.info('⚠️ Redis disabled. Background workers skipped.');
    return;
  }

  new Worker(
    'notifications',
    async (job: Job) => {
      logger.info(`Processing notification job ${job.id} for user ${job.data.userId}`);
    },
    { connection: redisConnection }
  );

  new Worker(
    'emails',
    async (job: Job) => {
      logger.info(`Processing email job ${job.id} to ${job.data.to}`);
    },
    { connection: redisConnection }
  );

  logger.info('Background job workers started');
};

export const getQueueStatus = async () => {
  if (!notificationQueue || !emailQueue) {
    return { notifications: 'disabled', emails: 'disabled' };
  }

  const [notifCounts, emailCounts] = await Promise.all([
    notificationQueue.getJobCounts('wait', 'active', 'completed', 'failed', 'delayed'),
    emailQueue.getJobCounts('wait', 'active', 'completed', 'failed', 'delayed'),
  ]);

  return {
    notifications: notifCounts,
    emails: emailCounts,
  };
};

export { notificationQueue, emailQueue };
