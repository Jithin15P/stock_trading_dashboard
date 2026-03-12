import axios from 'axios';

const api = axios.create({
  baseURL: 'https://stock-trading-backend-gi24.onrender.com',  // FIXED
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
