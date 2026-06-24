import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem('admin-auth-storage');
    if (stored) {
      try {
        const { state } = JSON.parse(stored);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      } catch {}
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin-auth-storage');
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;

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
    const res = await api.put(`/menu/${id}`, data);
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
