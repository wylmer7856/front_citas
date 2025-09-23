// src/Navigation/MedicoNavigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MedicoScreen from '../screens/Dashboard/MedicoScreen';
import EspecialidadesStack from './stacks/EspecialidadesStack';
import AsignacionesStack from './stacks/AsignacionesStack';
import HistorialStack from './stacks/HistorialStack';
import CitasStack from './stacks/CitasStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MedicoTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Citas':
              iconName = 'event';
              break;
            case 'Historiales':
              iconName = 'history';
              break;
            case 'Especialidades':
              iconName = 'medical-services';
              break;
            case 'MisEspecialidades':
              iconName = 'assignment';
              break;
            default:
              iconName = 'circle';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={MedicoScreen}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen 
        name="Citas" 
        component={CitasStack}
        options={{ title: 'Citas' }}
      />
      <Tab.Screen 
        name="Historiales" 
        component={HistorialStack}
        options={{ title: 'Historiales' }}
      />
      <Tab.Screen 
        name="Especialidades" 
        component={EspecialidadesStack}
        options={{ title: 'Especialidades' }}
      />
      <Tab.Screen 
        name="MisEspecialidades" 
        component={AsignacionesStack}
        options={{ title: 'Mis Especialidades' }}
      />
    </Tab.Navigator>
  );
}

export default function MedicoNavigation({ onLogout }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MedicoTabs" component={MedicoTabs} />
    </Stack.Navigator>
  );
}
