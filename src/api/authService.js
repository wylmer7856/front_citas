// src/api/authService.js
import axios from './api';

export const login = async (email, password) => {
  return axios.post('/login', { email, password });
};

export const register = async (data) => {
  return axios.post('/register', {
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    telefono: data.telefono,
    password: data.password,
    rol: data.rol || 'PACIENTE', //  por defecto 
  });
};

export const logout = async () => {
  const token = await AsyncStorage.getItem('token');
  return axios.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
