// src/Navigation/AdminNavigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AdminScreen from '../screens/Dashboard/AdminScreen';
import UsuariosStack from './stacks/UsuariosStack';
import EspecialidadesStack from './stacks/EspecialidadesStack';
import AsignacionesStack from './stacks/AsignacionesStack';
import HistorialStack from './stacks/HistorialStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Usuarios':
              iconName = 'people';
              break;
            case 'Especialidades':
              iconName = 'medical-services';
              break;
            case 'Asignaciones':
              iconName = 'assignment';
              break;
            case 'Historiales':
              iconName = 'history';
              break;
            default:
              iconName = 'circle';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={AdminScreen}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen 
        name="Usuarios" 
        component={UsuariosStack}
        options={{ title: 'Usuarios' }}
      />
      <Tab.Screen 
        name="Especialidades" 
        component={EspecialidadesStack}
        options={{ title: 'Especialidades' }}
      />
      <Tab.Screen 
        name="Asignaciones" 
        component={AsignacionesStack}
        options={{ title: 'Asignaciones' }}
      />
      <Tab.Screen 
        name="Historiales" 
        component={HistorialStack}
        options={{ title: 'Historiales' }}
      />
    </Tab.Navigator>
  );
}

export default function AdminNavigation({ onLogout }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
    </Stack.Navigator>
  );
}