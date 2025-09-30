import api from '../src/api/axiosInstance';
import { Alert } from 'react-native';

// Servicios base
export const ApiService = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      console.error(`Error en GET ${url}:`, error);
      if (error.response) {
        console.log('Respuesta de error:', error.response.data);
      }
      
      // Mostrar mensaje de error amigable
      const errorMessage = error.response?.data?.message || error.message || 'Error al obtener datos';
      Alert.alert('Error', errorMessage);
      throw error;
    }
  },

  // POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error en POST ${url}:`, error);
      if (error.response) {
        console.log('Respuesta de error:', error.response.data);
      }
      
      // Mostrar mensaje de error amigable
      const errorMessage = error.response?.data?.message || error.message || 'Error al enviar datos';
      Alert.alert('Error', errorMessage);
      throw error;
    }
  },

  // PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error en PUT ${url}:`, error);
      if (error.response) {
        console.log('Respuesta de error:', error.response.data);
      }
      
      // Mostrar mensaje de error amigable
      const errorMessage = error.response?.data?.message || error.message || 'Error al actualizar datos';
      Alert.alert('Error', errorMessage);
      throw error;
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      console.error(`Error en DELETE ${url}:`, error);
      if (error.response) {
        console.log('Respuesta de error:', error.response.data);
      }
      
      // Mostrar mensaje de error amigable
      const errorMessage = error.response?.data?.message || error.message || 'Error al eliminar datos';
      Alert.alert('Error', errorMessage);
      throw error;
    }
  },
};
