import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../../service/conexion';

// Crear instancia de axios con la URL base
const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: CONFIG.TIMEOUT,
  headers: CONFIG.DEFAULT_HEADERS,
});

// Interceptor para añadir el token de autenticación a las peticiones
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(CONFIG.STORAGE_KEYS.USER_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Manejar errores de autenticación (401)
    if (error.response && error.response.status === 401) {
      // Aquí podríamos implementar un refresh token o redireccionar al login
      await AsyncStorage.removeItem(CONFIG.STORAGE_KEYS.USER_TOKEN);
      await AsyncStorage.removeItem(CONFIG.STORAGE_KEYS.USER_DATA);
      // La redirección al login se manejará en el AuthContext
    }
    return Promise.reject(error);
  }
);

export default api;