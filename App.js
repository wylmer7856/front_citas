// App.js - Navegación principal con roles
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import { ActivityIndicator, View } from "react-native";

// Navegaciones
import AuthNavigation from "./src/navigation/AuthNavigation";
import AdminNavigation from "./src/navigation/AdminNavigation";
import MedicoNavigation from "./src/navigation/MedicoNavigation"; 
import PacienteNavigation from "./src/navigation/PacienteNavigation";

// Componente principal de navegación
const AppNavigator = () => {
  const { user, role, loading } = React.useContext(AuthContext);

  console.log("🔍 [NAV] Estado de navegación:", { user: !!user, role, loading });

  // Mostrar loading mientras se carga el usuario
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  // Si no hay usuario, mostrar auth
  if (!user) {
    console.log("📱 [NAV] Mostrando AuthNavigation - No hay usuario");
    return <AuthNavigation />;
  }

  // Navegación basada en rol
  console.log(`📱 [NAV] Usuario logueado con rol: ${role}`);
  
  switch (role) {
    case "ADMIN":
      console.log("📱 [NAV] Cargando AdminNavigation");
      return <AdminNavigation />;
      
    case "MEDICO":
      console.log("📱 [NAV] Cargando MedicoNavigation");
      return <MedicoNavigation />;
      
    case "PACIENTE":
      console.log("📱 [NAV] Cargando PacienteNavigation");
      return <PacienteNavigation />;
      
    default:
      console.warn(`⚠️ [NAV] Rol desconocido: ${role}, usando PacienteNavigation por defecto`);
      return <PacienteNavigation />;
  }
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
