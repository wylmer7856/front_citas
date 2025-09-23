// src/Navigation/PacienteNavigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import PacienteScreen from '../screens/Dashboard/PacienteScreen';
import HistorialStack from './stacks/HistorialStack';
import CitasStack from './stacks/CitasStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function PacienteTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'MisCitas':
              iconName = 'event';
              break;
            case 'MiHistorial':
              iconName = 'history';
              break;
            default:
              iconName = 'circle';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#9C27B0',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={PacienteScreen}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen 
        name="MisCitas" 
        component={CitasStack}
        options={{ title: 'Mis Citas' }}
      />
      <Tab.Screen 
        name="MiHistorial" 
        component={HistorialStack}
        options={{ title: 'Mi Historial' }}
      />
    </Tab.Navigator>
  );
}

export default function PacienteNavigation({ onLogout }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PacienteTabs" component={PacienteTabs} />
    </Stack.Navigator>
  );
}