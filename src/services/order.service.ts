import { api } from './api';
import type { Order, DeliveryAddress } from '../types';

interface CreateOrderData {
  items: {
    menuItem: string;
    nameSnapshot: string;
    quantity: number;
    priceSnapshot: number;
    selectedAddons?: { name: string; price: number }[];
    selectedVariant?: { name: string; price: number };
    itemTotal: number;
  }[];
  deliveryAddress: DeliveryAddress;
}

export const orderService = {
  createOrder: async (data: CreateOrderData): Promise<Order> => {
    const response = await api.post('/orders', data);
    return response.data.data;
  },

  getMyOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data.data.orders;
  },

  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data.data;
  },
};
