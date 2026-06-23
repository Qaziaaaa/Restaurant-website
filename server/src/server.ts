import http from 'http';
import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';
import logger from './utils/logger';
import { socketService } from './sockets/socket.service';
import { startWorkers } from './queues/queue.service';
import mongoose from 'mongoose';
import Redis from 'ioredis';
import './models'; // Register all models

// Setup Redis for Socket.io Scaling (Optional)
const isRedisDisabled = process.env.DISABLE_REDIS === 'true';
let pubClient: any = null;
let subClient: any = null;

const startServer = async () => {
  // Connect to Database
  await connectDB();

  const httpServer = http.createServer(app);

  if (!isRedisDisabled) {
    const redisOptions: any = {
      maxRetriesPerRequest: 0,
      connectTimeout: 500,
      lazyConnect: true,
      enableOfflineQueue: false,
    };
    pubClient = new Redis(env.REDIS_URL, redisOptions);
    subClient = new Redis(env.REDIS_URL, redisOptions);
    pubClient.on('error', () => {});
    subClient.on('error', () => {});
  }

  // Initialize Socket.io (Standalone mode if Redis is disabled or fails)
  socketService.init(httpServer, pubClient, subClient);

  // Start Background Job Workers
  startWorkers();

  const server = httpServer.listen(env.PORT, () => {
    logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    console.log(`Server running on port ${env.PORT}`);
  });

  return server;
};

startServer().then((server) => {
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: Error) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err: Error) => {
    logger.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
  });

  // Graceful shutdown
  const shutdown = async () => {
    logger.info('Shutting down gracefully...');
    server.close(async () => {
      try {
        await mongoose.connection.close();
        logger.info('Database connection closed.');
        
        if (pubClient) pubClient.disconnect();
        if (subClient) subClient.disconnect();
        if (pubClient || subClient) logger.info('Redis connections closed.');
        
        process.exit(0);
      } catch (err) {
        logger.error('Error during shutdown:', err);
        process.exit(1);
      }
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
});
