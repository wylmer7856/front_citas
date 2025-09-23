// src/Navigation/AppNavigation.js
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthNavigation from './AuthNavigation';
import AdminNavigation from './AdminNavigation';
import MedicoNavigation from './MedicoNavigation';
import PacienteNavigation from './PacienteNavigation';
import { ROLES } from '../utils/roles';

export default function AppNavigation() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  // Sin NavigationContainer aquí - se maneja en App.js
  const getNavigationByRole = () => {
    if (!user) return <AuthNavigation onLogin={handleLogin} />;

    switch (user.rol) {
      case ROLES.ADMIN:
        return <AdminNavigation onLogout={handleLogout} />;
      case ROLES.MEDICO:
        return <MedicoNavigation onLogout={handleLogout} />;
      case ROLES.PACIENTE:
        return <PacienteNavigation onLogout={handleLogout} />;
      default:
        return <AuthNavigation onLogin={handleLogin} />;
    }
  };

  return getNavigationByRole();
}