import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import { env } from './config/env';
import { errorHandler, notFound } from './middlewares/errorMiddleware';
import routes from './routes';
import logger from './utils/logger';
import { handleStripeWebhook } from './modules/orders/webhook.controller';
import { correlationIdMiddleware } from './middlewares/correlationMiddleware';
import { metricsMiddleware } from './middlewares/metricsMiddleware';
import { register } from './monitoring/metrics';

const app: Express = express();

// Security Middlewares
app.use(correlationIdMiddleware);
app.use(metricsMiddleware);
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Increased for SPA compatibility
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

// Apply rate limiter to all requests
app.use('/api', limiter);

// Request Parsing
app.post('/api/v1/orders/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  // Use Morgan with Winston for production
  app.use(
    morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - ID: :req[x-correlation-id]', {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    })
  );
}

import mongoose from 'mongoose';
import { cacheService } from './services/cache.service';
import { getQueueStatus } from './queues/queue.service';

// Health Check Endpoint
app.get('/api/v1/health', async (req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const redisStatus = cacheService.getStatus();
  const queueStatus = await getQueueStatus();
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    success: true,
    message: 'Server is running',
    status: {
      uptime: process.uptime(),
      timestamp: Date.now(),
      database: dbStatus,
      redis: redisStatus,
      queues: queueStatus,
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      },
      process: {
        pid: process.pid,
        version: process.version,
      },
      environment: env.NODE_ENV,
    },
  });
});

// Prometheus Metrics Endpoint
app.get('/api/v1/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// API Routes
app.use('/api/v1', routes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
