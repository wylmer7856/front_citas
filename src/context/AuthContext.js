import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMe, logout as apiLogout } from '../../service/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        try {
          const data = await getMe();
          setUser(data);
          setToken(storedToken);
        } catch (error) {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userData');
        }
      }
      setLoading(false);
    };

    loadSession();
  }, []);

  const login = async (data) => {
    await AsyncStorage.setItem('userToken', data.token);
    await AsyncStorage.setItem('userData', JSON.stringify(data.user));
    setUser(data.user);
    setToken(data.token);
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (e) {
      console.log('Error al cerrar sesión:', e.message);
    }
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
