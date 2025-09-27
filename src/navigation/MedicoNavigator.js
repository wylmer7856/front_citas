import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Medico/Dashboard';
import MisCitas from '../screens/Medico/MisCitas';
import Horarios from '../screens/Medico/Horarios';
import PerfilMedico from '../screens/Medico/PerfilMedico';
import HistorialPacientes from '../screens/Medico/HistorialPacientes';

const Tab = createBottomTabNavigator();

const MedicoNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Inicio" component={Dashboard} />
    <Tab.Screen name="Citas" component={MisCitas} />
    <Tab.Screen name="Horarios" component={Horarios} />
    <Tab.Screen name="Perfil" component={PerfilMedico} />
    <Tab.Screen name="Historial" component={HistorialPacientes} />
  </Tab.Navigator>
);

export default MedicoNavigator;
