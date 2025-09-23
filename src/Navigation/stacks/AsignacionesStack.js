// src/Navigation/stacks/AsignacionesStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListarAsignaciones from '../../screens/MedicoEspecialidad/ListarAsignaciones';
import AsignarEspecialidad from '../../screens/MedicoEspecialidad/AsignarEspecialidad';

const Stack = createStackNavigator();

export default function AsignacionesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FF9800' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen 
        name="ListarAsignaciones" 
        component={ListarAsignaciones}
        options={{ title: 'Asignaciones Médico-Especialidad' }}
      />
      <Stack.Screen 
        name="AsignarEspecialidad" 
        component={AsignarEspecialidad}
        options={{ title: 'Asignar Especialidad' }}
      />
    </Stack.Navigator>
  );
}
