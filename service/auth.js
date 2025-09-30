import { ApiService } from './ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from './conexion';

// 🔐 Login: recibe email y password, devuelve { token, user }
export const login = async (data) => {
  try {
    console.log('Iniciando login con:', { email: data.email });
    
    // Usar ApiService para mantener consistencia en las llamadas API
    const response = await fetch(getApiUrl('/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Status de respuesta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error del servidor:', errorText);
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const responseData = await response.json();
    console.log('Datos de respuesta:', responseData);
    
    // Extraer token y usuario de la respuesta
    let token, user;
    
    if (responseData.token) {
      token = responseData.token;
      user = responseData.user;
    } else if (responseData.access_token) {
      token = responseData.access_token;
      user = responseData.user;
    } else {
      console.log('Respuesta completa del servidor:', responseData);
      throw new Error('No se encontró token en la respuesta del servidor');
    }

    // Guardar el token en AsyncStorage
    await AsyncStorage.setItem('userToken', token);
    console.log('Token guardado en AsyncStorage');

    // Si no tenemos el usuario, usar datos básicos
    if (!user) {
      user = { 
        email: data.email,
        name: data.email.split('@')[0], // Usar email como nombre por defecto
        role: 'PACIENTE' // Rol por defecto
      };
    }

    console.log('Login exitoso, retornando:', { token: token.substring(0, 10) + '...', user });
    return { token, user };
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// 🆕 Registro
export const register = async (data) => {
  return await ApiService.post('/register', data);
};

// 🚪 Logout
export const logout = async () => {
  return await ApiService.post('/logout');
};

// 👤 Obtener perfil actual
export const getMe = async () => {
  return await ApiService.get('/me');
};

// ✏️ Actualizar perfil
export const updateMe = async (data) => {
  return await ApiService.put('/me', data);
};
