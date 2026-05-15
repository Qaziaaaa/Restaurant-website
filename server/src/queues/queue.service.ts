import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import logger from '../utils/logger';

const redisConnection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

// 1. Notification Queue
export const notificationQueue = new Queue('notifications', {
  connection: redisConnection,
});

// 2. Email Queue
export const emailQueue = new Queue('emails', {
  connection: redisConnection,
});

// Workers for background processing
export const startWorkers = () => {
  // Notification Worker
  new Worker(
    'notifications',
    async (job: Job) => {
      logger.info(`Processing notification job ${job.id} for user ${job.data.userId}`);
      // TODO: Logic for push notification / WhatsApp etc.
    },
    { connection: redisConnection }
  );

  // Email Worker
  new Worker(
    'emails',
    async (job: Job) => {
      logger.info(`Processing email job ${job.id} to ${job.data.to}`);
      // TODO: Integration with SendGrid / AWS SES
    },
    { connection: redisConnection }
  );

  logger.info('Background job workers started');
};
