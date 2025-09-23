
// src/Navigation/stacks/CitasStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListarCitas from '../../screens/Citas/ListarCitas';
import CrearCita from '../../screens/Citas/CrearCita';
import EditarCita from '../../screens/Citas/EditarCita';
import DetalleCita from '../../screens/Citas/DetalleCita';

const Stack = createStackNavigator();

export default function CitasStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#F44336' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen 
        name="ListarCitas" 
        component={ListarCitas}
        options={{ title: 'Gestión de Citas' }}
      />
      <Stack.Screen 
        name="CrearCita" 
        component={CrearCita}
        options={{ title: 'Agendar Nueva Cita' }}
      />
      <Stack.Screen 
        name="EditarCita" 
        component={EditarCita}
        options={{ title: 'Modificar Cita' }}
      />
      <Stack.Screen 
        name="DetalleCita" 
        component={DetalleCita}
        options={{ title: 'Información de la Cita' }}
      />
    </Stack.Navigator>
  );
}
