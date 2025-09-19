import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Pantalla principal del paciente
import PacienteScreen from "../screens/Inicio/PacienteScreen";

// Screens de Citas
import ListarCitas from "../screens/Citas/ListarCitas";
import DetalleCita from "../screens/Citas/DetalleCita";
import CrearEditarCita from "../screens/Citas/CrearEditarCita";

// Screens de Historial (solo visualización)
import ListarHistorial from "../screens/Historial/ListarHistorial";
import DetalleHistorial from "../screens/Historial/DetalleHistorial";

const Stack = createNativeStackNavigator();

export default function PacienteNavigation() {
  return (
    <Stack.Navigator initialRouteName="PacienteScreen">
      {/* Dashboard del paciente */}
      <Stack.Screen
        name="PacienteScreen"
        component={PacienteScreen}
        options={{ headerShown: false }}
      />

      {/* Citas */}
      <Stack.Screen name="ListarCitas" component={ListarCitas} />
      <Stack.Screen name="DetalleCita" component={DetalleCita} />
      <Stack.Screen name="CrearEditarCita" component={CrearEditarCita} />

      {/* Historial */}
      <Stack.Screen name="ListarHistorial" component={ListarHistorial} />
      <Stack.Screen name="DetalleHistorial" component={DetalleHistorial} />
    </Stack.Navigator>
  );
}
