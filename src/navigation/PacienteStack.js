// src/navigation/PacienteStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardPaciente from '../../Screen/Paciente/DashboardPaciente';
import PerfilPacienteScreen from '../../Screen/Paciente/PerfilPacienteScreen';
import CitasPacienteScreen from '../../Screen/Paciente/CitasPacienteScreen';
import NuevaCitaScreen from '../../Screen/Paciente/NuevaCitaScreen';

const Stack = createNativeStackNavigator();

const PacienteStack = () => (
  <Stack.Navigator initialRouteName="DashboardPaciente" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DashboardPaciente" component={DashboardPaciente} />
    <Stack.Screen name="PerfilPaciente" component={PerfilPacienteScreen} />
    <Stack.Screen name="CitasPaciente" component={CitasPacienteScreen} />
    <Stack.Screen name="NuevaCita" component={NuevaCitaScreen} />
  </Stack.Navigator>
);

export default PacienteStack;
