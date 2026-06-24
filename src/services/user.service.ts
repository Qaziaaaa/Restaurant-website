import { api } from './api';

export interface Address {
  _id?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data.data;
  },

  updateProfile: async (data: { name?: string; email?: string; phone?: string }) => {
    const response = await api.patch('/users/me', data);
    return response.data.data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.patch('/users/me/password', { currentPassword, newPassword });
    return response.data;
  },

  getAddresses: async (): Promise<Address[]> => {
    const response = await api.get('/users/me/addresses');
    return response.data.data;
  },

  createAddress: async (address: Address): Promise<Address[]> => {
    const response = await api.post('/users/me/addresses', address);
    return response.data.data;
  },

  updateAddress: async (id: string, address: Partial<Address>): Promise<Address[]> => {
    const response = await api.put(`/users/me/addresses/${id}`, address);
    return response.data.data;
  },

  deleteAddress: async (id: string): Promise<Address[]> => {
    const response = await api.delete(`/users/me/addresses/${id}`);
    return response.data.data;
  },

  deleteAccount: async () => {
    const response = await api.delete('/users/me');
    return response.data;
  },
};
