// src/Navigation/stacks/HistorialStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListarHistorial from '../../screens/Historial/ListarHistorial';
import CrearHistorial from '../../screens/Historial/CrearHistorial';
import EditarHistorial from '../../screens/Historial/EditarHistorial';
import DetalleHistorial from '../../screens/Historial/DetalleHistorial';

const Stack = createStackNavigator();

export default function HistorialStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#9C27B0' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen 
        name="ListarHistorial" 
        component={ListarHistorial}
        options={{ title: 'Historial Médico' }}
      />
      <Stack.Screen 
        name="CrearHistorial" 
        component={CrearHistorial}
        options={{ title: 'Nuevo Registro Médico' }}
      />
      <Stack.Screen 
        name="EditarHistorial" 
        component={EditarHistorial}
        options={{ title: 'Editar Registro' }}
      />
      <Stack.Screen 
        name="DetalleHistorial" 
        component={DetalleHistorial}
        options={{ title: 'Detalle del Registro' }}
      />
    </Stack.Navigator>
  );
}