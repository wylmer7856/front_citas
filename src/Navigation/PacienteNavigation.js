// src/navigation/PacienteNavigation.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PacienteScreen from "../screens/paciente/PacienteScreen";
import MisCitasScreen from "../screens/paciente/citas/MisCitasScreen";
import AgendarCitaScreen from "../screens/paciente/citas/AgendarCitaScreen";
import EditarCitaScreen from "../screens/paciente/citas/EditarCitaScreen";
import DetalleCitaScreen from "../screens/paciente/citas/DetalleCitaScreen";
import MiHistorialScreen from "../screens/paciente/historial/MiHistorialScreen";
import DetalleHistorialScreen from "../screens/paciente/historial/DetalleHistorialScreen";

const Stack = createNativeStackNavigator();

export default function PacienteNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PacienteDashboard" component={PacienteScreen} />
      <Stack.Screen name="MisCitas" component={MisCitasScreen} />
      <Stack.Screen name="AgendarCita" component={AgendarCitaScreen} />
      <Stack.Screen name="EditarCita" component={EditarCitaScreen} />
      <Stack.Screen name="DetalleCita" component={DetalleCitaScreen} />
      <Stack.Screen name="MiHistorial" component={MiHistorialScreen} />
      <Stack.Screen name="DetalleHistorial" component={DetalleHistorialScreen} />
    </Stack.Navigator>
  );
}
