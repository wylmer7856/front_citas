import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Paciente/Dashboard';
import MisCitas from '../screens/Paciente/MisCitas';
import ReservarCita from '../screens/Paciente/ReservarCita';
import PerfilPaciente from '../screens/Paciente/PerfilPaciente';
import HistorialCitas from '../screens/Paciente/HistorialCitas';

const Tab = createBottomTabNavigator();

const PacienteNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Inicio" component={Dashboard} />
    <Tab.Screen name="Mis Citas" component={MisCitas} />
    <Tab.Screen name="Reservar" component={ReservarCita} />
    <Tab.Screen name="Perfil" component={PerfilPaciente} />
    <Tab.Screen name="Historial" component={HistorialCitas} />
  </Tab.Navigator>
);

export default PacienteNavigator;
