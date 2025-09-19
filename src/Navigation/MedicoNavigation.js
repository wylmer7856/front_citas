import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Pantalla principal del médico
import MedicoScreen from "../screens/Inicio/MedicoScreen";

// Screens de Citas
import ListarCitas from "../screens/Citas/ListarCitas";
import DetalleCita from "../screens/Citas/DetalleCita";
import CrearEditarCita from "../screens/Citas/CrearEditarCita";

// Screens de Historial
import ListarHistorial from "../screens/Historial/ListarHistorial";
import DetalleHistorial from "../screens/Historial/DetalleHistorial";
import CrearEditarHistorial from "../screens/Historial/CrearEditarHistorial";

const Stack = createNativeStackNavigator();

export default function MedicoNavigation() {
  return (
    <Stack.Navigator initialRouteName="MedicoScreen">
      {/* Dashboard del médico */}
      <Stack.Screen
        name="MedicoScreen"
        component={MedicoScreen}
        options={{ headerShown: false }}
      />

      {/* Citas */}
      <Stack.Screen name="ListarCitas" component={ListarCitas} />
      <Stack.Screen name="DetalleCita" component={DetalleCita} />
      <Stack.Screen name="CrearEditarCita" component={CrearEditarCita} />

      {/* Historial */}
      <Stack.Screen name="ListarHistorial" component={ListarHistorial} />
      <Stack.Screen name="DetalleHistorial" component={DetalleHistorial} />
      <Stack.Screen name="CrearEditarHistorial" component={CrearEditarHistorial} />
    </Stack.Navigator>
  );
}
