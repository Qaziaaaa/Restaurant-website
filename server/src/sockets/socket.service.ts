import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';
import logger from '../utils/logger';
import { verifyAccessToken } from '../utils/jwt';

export class SocketService {
  private static instance: SocketService;
  private io: Server | null = null;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public init(server: HttpServer, pubClient: Redis | null, subClient: Redis | null) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST'],
      },
    });

    // Redis Adapter for Scaling (Only if Redis is connected)
    if (pubClient && (pubClient as any).status === 'ready') {
      this.io.adapter(createAdapter(pubClient, subClient!));
      logger.info('Socket.io Redis adapter initialized');
    } else {
      logger.warn('⚠️ Socket.io running in Standalone Mode (No Redis)');
    }

    // Authentication Middleware
    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error: Token missing'));
      }
      try {
        const decoded = verifyAccessToken(token) as any;
        (socket as any).userId = decoded.id;
        next();
      } catch (err) {
        next(new Error('Authentication error: Invalid token'));
      }
    });

    this.io.on('connection', (socket: Socket) => {
      const userId = (socket as any).userId;
      logger.info(`Socket authenticated: ${socket.id} (User: ${userId})`);

      // Automatically join the user's private room
      socket.join(`user_${userId}`);

      // Join admin room for staff (In real app, check user role here)
      socket.on('join_admin_room', () => {
        // TODO: Role check
        socket.join('admin_room');
        logger.info(`Socket ${socket.id} joined admin room`);
      });

      socket.on('disconnect', () => {
        logger.info(`Socket disconnected: ${socket.id}`);
      });
    });
  }

  public emitToUser(userId: string, event: string, data: any) {
    if (this.io) {
      this.io.to(`user_${userId}`).emit(event, data);
    }
  }

  public emitToAdmin(event: string, data: any) {
    if (this.io) {
      this.io.to('admin_room').emit(event, data);
    }
  }

  public emitOrderUpdate(userId: string, orderId: string, status: string) {
    this.emitToUser(userId, 'order_status_update', { orderId, status });
    this.emitToAdmin('new_order_update', { orderId, status });
  }
}

export const socketService = SocketService.getInstance();
