// src/Navigation/stacks/EspecialidadesStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListarEspecialidades from '../../screens/Especialidades/ListarEspecialidades';
import CrearEspecialidad from '../../screens/Especialidades/CrearEspecialidad';
import EditarEspecialidad from '../../screens/Especialidades/EditarEspecialidad';
import DetalleEspecialidad from '../../screens/Especialidades/DetalleEspecialidad';

const Stack = createStackNavigator();

export default function EspecialidadesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4CAF50' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen 
        name="ListarEspecialidades" 
        component={ListarEspecialidades}
        options={{ title: 'Especialidades Médicas' }}
      />
      <Stack.Screen 
        name="CrearEspecialidad" 
        component={CrearEspecialidad}
        options={{ title: 'Nueva Especialidad' }}
      />
      <Stack.Screen 
        name="EditarEspecialidad" 
        component={EditarEspecialidad}
        options={{ title: 'Editar Especialidad' }}
      />
      <Stack.Screen 
        name="DetalleEspecialidad" 
        component={DetalleEspecialidad}
        options={{ title: 'Detalle de Especialidad' }}
      />
    </Stack.Navigator>
  );
}