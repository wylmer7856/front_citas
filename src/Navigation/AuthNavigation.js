// src/Navigation/AuthNavigation.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import InicioScreen from '../screens/Inicio/InicioScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

const Stack = createStackNavigator();

export default function AuthNavigation({ onLogin }) {
  return (
    <Stack.Navigator 
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle: { backgroundColor: '#673AB7' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen 
        name="Inicio" 
        component={InicioScreen}
        options={{ title: 'Bienvenido', headerShown: false }}
      />
      <Stack.Screen 
        name="Login"
        options={{ title: 'Iniciar Sesión' }}
      >
        {props => <LoginScreen {...props} onLogin={onLogin} />}
      </Stack.Screen>
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ title: 'Crear Cuenta' }}
      />
    </Stack.Navigator>
  );
}