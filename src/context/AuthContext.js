import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, logout, getProfile } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (credentials) => {
    const response = await login(credentials);
    const accessToken = response.data.token;
    await AsyncStorage.setItem('token', accessToken);
    setToken(accessToken);
  };

  const signOut = async () => {
    await logout();
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    setToken(storedToken);
    setLoading(false);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
