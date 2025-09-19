import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Dashboard principal para el administrador
import AdminScreen from "../screens/Inicio/AdminScreen";

// Screens de Usuarios
import ListarUsuarios from "../screens/Usuarios/ListarUsuarios";
import CrearEditarUsuario from "../screens/Usuarios/CrearEditarUsuario";
import DetalleUsuario from "../screens/Usuarios/DetalleUsuario";

// Screens de Especialidades
import ListarEspecialidades from "../screens/Especialidades/ListarEspecialidades";
import CrearEditarEspecialidad from "../screens/Especialidades/CrearEditarEspecialidad";
import DetalleEspecialidad from "../screens/Especialidades/DetalleEspecialidad";

// Screens de Médico-Especialidad
import ListarMedicoEspecialidad from "../screens/MedicoEspecialidad/ListarMedicoEspecialidad";
import CrearEditarMedicoEspecialidad from "../screens/MedicoEspecialidad/CrearEditarMedicoEspecialidad";
import DetalleMedicoEspecialidad from "../screens/MedicoEspecialidad/DetalleMedicoEspecialidad";

// Screens de Citas
import ListarCitas from "../screens/Citas/ListarCitas";
import CrearEditarCita from "../screens/Citas/CrearEditarCita";
import DetalleCita from "../screens/Citas/DetalleCita";

// Screens de Historial
import ListarHistorial from "../screens/Historial/ListarHistorial";
import CrearEditarHistorial from "../screens/Historial/CrearEditarHistorial";
import DetalleHistorial from "../screens/Historial/DetalleHistorial";

const Stack = createNativeStackNavigator();

export default function AdminNavigation() {
  return (
    <Stack.Navigator initialRouteName="AdminScreen">
      {/* Dashboard principal */}
      <Stack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{ headerShown: false }}
      />

      {/* Usuarios */}
      <Stack.Screen name="ListarUsuarios" component={ListarUsuarios} />
      <Stack.Screen name="CrearEditarUsuario" component={CrearEditarUsuario} />
      <Stack.Screen name="DetalleUsuario" component={DetalleUsuario} />

      {/* Especialidades */}
      <Stack.Screen name="ListarEspecialidades" component={ListarEspecialidades} />
      <Stack.Screen name="CrearEditarEspecialidad" component={CrearEditarEspecialidad} />
      <Stack.Screen name="DetalleEspecialidad" component={DetalleEspecialidad} />

      {/* Médico-Especialidad */}
      <Stack.Screen
        name="ListarMedicoEspecialidad"
        component={ListarMedicoEspecialidad}
      />
      <Stack.Screen
        name="CrearEditarMedicoEspecialidad"
        component={CrearEditarMedicoEspecialidad}
      />
      <Stack.Screen
        name="DetalleMedicoEspecialidad"
        component={DetalleMedicoEspecialidad}
      />

      {/* Citas */}
      <Stack.Screen name="ListarCitas" component={ListarCitas} />
      <Stack.Screen name="CrearEditarCita" component={CrearEditarCita} />
      <Stack.Screen name="DetalleCita" component={DetalleCita} />

      {/* Historial */}
      <Stack.Screen name="ListarHistorial" component={ListarHistorial} />
      <Stack.Screen name="CrearEditarHistorial" component={CrearEditarHistorial} />
      <Stack.Screen name="DetalleHistorial" component={DetalleHistorial} />
    </Stack.Navigator>
  );
}
