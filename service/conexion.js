// Configuración de conexión para la aplicación
export const CONFIG = {
  // URL base del servidor backend
  API_BASE_URL: 'http://192.168.0.2:8000/api',
  
  // Timeout para las peticiones
  TIMEOUT: 30000,
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Configuración de almacenamiento
  STORAGE_KEYS: {
    USER_TOKEN: 'userToken',
    USER_DATA: 'userData',
  },
  
  // Configuración de roles
  ROLES: {
    ADMIN: 'ADMIN',
    MEDICO: 'MEDICO',
    PACIENTE: 'PACIENTE',
  },
};

// Función para obtener la URL completa de un endpoint
export const getApiUrl = (endpoint) => {
  return `${CONFIG.API_BASE_URL}${endpoint}`;
};

// Función para obtener headers con autenticación
export const getAuthHeaders = async () => {
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  const token = await AsyncStorage.getItem(CONFIG.STORAGE_KEYS.USER_TOKEN);
  
  return {
    ...CONFIG.DEFAULT_HEADERS,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};








