import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import logger from '../utils/logger';

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

  public init(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST'],
      },
    });

    this.io.on('connection', (socket: Socket) => {
      logger.info(`Socket connected: ${socket.id}`);

      // Join a room for the user to receive private updates
      socket.on('join_user_room', (userId: string) => {
        socket.join(`user_${userId}`);
        logger.info(`Socket ${socket.id} joined user room: user_${userId}`);
      });

      // Join admin room for kitchen/management notifications
      socket.on('join_admin_room', () => {
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
