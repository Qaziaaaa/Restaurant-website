import { api } from './api';
import type { MenuItem, Category, PaginatedResponse } from '../types';

interface MenuParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
}

export const menuService = {
  getMenuItems: async (params?: MenuParams): Promise<PaginatedResponse<MenuItem>> => {
    const response = await api.get('/menu', { params });
    return response.data.data;
  },

  getMenuItemById: async (id: string): Promise<MenuItem> => {
    const response = await api.get(`/menu/${id}`);
    return response.data.data;
  },

  getFeaturedItems: async (): Promise<PaginatedResponse<MenuItem>> => {
    const response = await api.get('/menu', { params: { isFeatured: true, limit: 4 } });
    return response.data.data;
  },
};
