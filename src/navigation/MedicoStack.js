import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../../Screen/Medico/Dashboard';
import PerfilMedicoScreen from '../../Screen/Medico/PerfilMedicoScreen';
import HorariosScreen from '../../Screen/Medico/HorariosScreen';
import CitasMedicoScreen from '../../Screen/Medico/CitasMedicoScreen';

const Stack = createNativeStackNavigator();

const MedicoStack = () => (
  <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="PerfilMedico" component={PerfilMedicoScreen} />
    <Stack.Screen name="Horarios" component={HorariosScreen} />
    <Stack.Screen name="CitasMedico" component={CitasMedicoScreen} />
  </Stack.Navigator>
);

export default MedicoStack;
