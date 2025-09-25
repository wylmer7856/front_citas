// src/navigation/MedicoNavigation.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MedicoScreen from "../screens/medico/MedicoScreen";
import ListarCitasScreen from "../screens/medico/citas/ListarCitasScreen";
import CrearCitaScreen from "../screens/medico/citas/CrearCitaScreen";
import EditarCitaScreen from "../screens/medico/citas/EditarCitaScreen";
import DetalleCitaScreen from "../screens/medico/citas/DetalleCitaScreen";
import ListarHistorialesScreen from "../screens/medico/historiales/ListarHistorialesScreen";
import CrearHistorialScreen from "../screens/medico/historiales/CrearHistorialScreen";
import EditarHistorialScreen from "../screens/medico/historiales/EditarHistorialScreen";
import DetalleHistorialScreen from "../screens/medico/historiales/DetalleHistorialScreen";
import MisEspecialidadesScreen from "../screens/medico/especialidades/MisEspecialidadesScreen";
import DetalleEspecialidadScreen from "../screens/medico/especialidades/DetalleEspecialidadScreen";

const Stack = createNativeStackNavigator();

export default function MedicoNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MedicoDashboard" component={MedicoScreen} />
      <Stack.Screen name="ListarCitas" component={ListarCitasScreen} />
      <Stack.Screen name="CrearCita" component={CrearCitaScreen} />
      <Stack.Screen name="EditarCita" component={EditarCitaScreen} />
      <Stack.Screen name="DetalleCita" component={DetalleCitaScreen} />
      <Stack.Screen name="ListarHistoriales" component={ListarHistorialesScreen} />
      <Stack.Screen name="CrearHistorial" component={CrearHistorialScreen} />
      <Stack.Screen name="EditarHistorial" component={EditarHistorialScreen} />
      <Stack.Screen name="DetalleHistorial" component={DetalleHistorialScreen} />
      <Stack.Screen name="MisEspecialidades" component={MisEspecialidadesScreen} />
      <Stack.Screen name="DetalleEspecialidad" component={DetalleEspecialidadScreen} />
    </Stack.Navigator>
  );
}
