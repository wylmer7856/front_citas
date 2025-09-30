import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Cargar la preferencia del tema al iniciar
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error al cargar el tema:', error);
      }
    };

    loadThemePreference();
  }, []);

  // Guardar la preferencia del tema cuando cambia
  useEffect(() => {
    const saveThemePreference = async () => {
      try {
        await AsyncStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      } catch (error) {
        console.error('Error al guardar el tema:', error);
      }
    };

    saveThemePreference();
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Definir los colores para cada tema
  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode 
      ? {
          // Tema oscuro
          background: '#121212',
          surface: '#1E1E1E',
          primary: '#BB86FC',
          secondary: '#03DAC6',
          text: '#FFFFFF',
          textSecondary: '#B0B0B0',
          border: '#2C2C2C',
          error: '#CF6679',
          buttonText: '#FFFFFF',
          card: '#2C2C2C',
          statusBar: 'light-content',
        }
      : {
          // Tema claro
          background: '#FFFFFF',
          surface: '#F5F5F5',
          primary: '#6200EE',
          secondary: '#03DAC6',
          text: '#000000',
          textSecondary: '#666666',
          border: '#E0E0E0',
          error: '#B00020',
          buttonText: '#FFFFFF',
          card: '#FFFFFF',
          statusBar: 'dark-content',
        }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};