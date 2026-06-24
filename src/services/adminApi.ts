import { api } from './api';

export const adminApi = {
  getDashboardStats: async () => {
    const res = await api.get('/orders/admin/stats');
    return res.data.data;
  },

  getOrders: async (params?: { page?: number; limit?: number; status?: string; paymentStatus?: string }) => {
    const res = await api.get('/orders/admin/all', { params });
    return res.data.data;
  },

  updateOrderStatus: async (id: string, status: string) => {
    const res = await api.patch(`/orders/admin/${id}/status`, { status });
    return res.data.data;
  },

  getMenuItems: async () => {
    const res = await api.get('/menu');
    return res.data.data;
  },

  createMenuItem: async (data: any) => {
    const res = await api.post('/menu', data);
    return res.data.data;
  },

  updateMenuItem: async (id: string, data: any) => {
    const res = await api.patch(`/menu/${id}`, data);
    return res.data.data;
  },

  deleteMenuItem: async (id: string) => {
    const res = await api.delete(`/menu/${id}`);
    return res.data;
  },

  getKitchenOrders: async () => {
    const res = await api.get('/orders/admin/all', { params: { status: 'CONFIRMED,PREPARING', limit: 50 } });
    return res.data.data;
  },
};
