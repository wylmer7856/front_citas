import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../../Screen/Admin/Dashboard';
import UsuariosScreen from '../../Screen/Admin/UsuariosScreen';
import MedicosScreen from '../../Screen/Admin/MedicosScreen';
import PacientesScreen from '../../Screen/Admin/PacientesScreen';
import CitasScreen from '../../Screen/Admin/CitasScreen';
import RegisterUserScreen from '../../Screen/Admin/RegisterUserScreen';

const Stack = createNativeStackNavigator();

const AdminStack = () => (
  <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Usuarios" component={UsuariosScreen} />
    <Stack.Screen name="Medicos" component={MedicosScreen} />
    <Stack.Screen name="Pacientes" component={PacientesScreen} />
    <Stack.Screen name="Citas" component={CitasScreen} />
    <Stack.Screen name="RegisterUser" component={RegisterUserScreen} />
  </Stack.Navigator>
);

export default AdminStack;
