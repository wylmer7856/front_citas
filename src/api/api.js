// src/api/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'http://172.20.10.5:8000/api', // IP local del servidor Laravel
  timeout: 10000, // 10 segundos para evitar errores de red lenta
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para agregar token automáticamente (excepto en rutas públicas)
instance.interceptors.request.use(
  async (config) => {
    const publicRoutes = ['/login', '/register'];
    if (!publicRoutes.includes(config.url)) {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
