import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/useAuthStore';
import logger from '../lib/logger'; // Placeholder for consistency

let socket: Socket | null = null;

export const useSocket = () => {
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    if (!socket) {
      socket = io('/', {
        auth: { token },
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.on('connect', () => {
        console.log('Socket connected:', socket?.id);
        socket?.emit('join_admin_room');
      });

      socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
      });

      socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
      });
    }

    return () => {
      // Keep socket alive during session unless explicitly logout
    };
  }, [isAuthenticated, token]);

  return socket;
};
