// src/navigation/AdminNavigation.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminScreen from "../screens/admin/AdminScreen";
import ListarUsuariosScreen from "../screens/admin/usuarios/ListarUsuariosScreen";
import CrearUsuarioScreen from "../screens/admin/usuarios/CrearUsuarioScreen";
import EditarUsuarioScreen from "../screens/admin/usuarios/EditarUsuarioScreen";
import DetalleUsuarioScreen from "../screens/admin/usuarios/DetalleUsuarioScreen";
import ListarEspecialidadesScreen from "../screens/admin/especialidades/ListarEspecialidadesScreen";
import CrearEspecialidadScreen from "../screens/admin/especialidades/CrearEspecialidadScreen";
import EditarEspecialidadScreen from "../screens/admin/especialidades/EditarEspecialidadScreen";
import ListarAsignacionesScreen from "../screens/admin/asignaciones/ListarAsignacionesScreen";
import CrearAsignacionScreen from "../screens/admin/asignaciones/CrearAsignacionScreen";
import ListarHistorialesScreen from "../screens/admin/historiales/ListarHistorialesScreen";
import DetalleHistorialScreen from "../screens/admin/historiales/DetalleHistorialScreen";

const Stack = createNativeStackNavigator();

export default function AdminNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminDashboard" component={AdminScreen} />
      <Stack.Screen name="ListarUsuarios" component={ListarUsuariosScreen} />
      <Stack.Screen name="CrearUsuario" component={CrearUsuarioScreen} />
      <Stack.Screen name="EditarUsuario" component={EditarUsuarioScreen} />
      <Stack.Screen name="DetalleUsuario" component={DetalleUsuarioScreen} />
      <Stack.Screen name="ListarEspecialidades" component={ListarEspecialidadesScreen} />
      <Stack.Screen name="CrearEspecialidad" component={CrearEspecialidadScreen} />
      <Stack.Screen name="EditarEspecialidad" component={EditarEspecialidadScreen} />
      <Stack.Screen name="ListarAsignaciones" component={ListarAsignacionesScreen} />
      <Stack.Screen name="CrearAsignacion" component={CrearAsignacionScreen} />
      <Stack.Screen name="ListarHistoriales" component={ListarHistorialesScreen} />
      <Stack.Screen name="DetalleHistorial" component={DetalleHistorialScreen} />
    </Stack.Navigator>
  );
}
