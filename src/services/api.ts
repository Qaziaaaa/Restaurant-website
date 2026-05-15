import axios from 'axios';

// Create an Axios instance for API calls
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for error handling, auth, etc.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: Handle global errors like 401 Unauthorized
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
