// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token) => {
  await AsyncStorage.setItem('token', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const saveUser = async (usuario) => {
  await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
};

export const getUser = async () => {
  const data = await AsyncStorage.getItem('usuario');
  return data ? JSON.parse(data) : null;
};

export const clearSession = async () => {
  await AsyncStorage.multiRemove(['token', 'usuario']);
};
