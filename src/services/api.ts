import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Create an Axios instance for API calls
export const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Potentially refresh token or logout
      useAuthStore.getState().logout();
    }
    
    return Promise.reject(new Error(message));
  }
);
