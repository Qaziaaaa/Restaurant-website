import http from 'http';
import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';
import logger from './utils/logger';
import { socketService } from './sockets/socket.service';
import { startWorkers } from './queues/queue.service';
import mongoose from 'mongoose';

// Connect to Database
connectDB();

const httpServer = http.createServer(app);

// Initialize Socket.io
socketService.init(httpServer);

// Start Background Job Workers
startWorkers();

const server = httpServer.listen(env.PORT, () => {
  logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  console.log(`Server running on port ${env.PORT}`);
});

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
      process.exit(0);
    } catch (err) {
      logger.error('Error during shutdown:', err);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
