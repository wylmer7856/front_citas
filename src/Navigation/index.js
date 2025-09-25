// src/navigation/index.js
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "../context/AuthContext";

// Screens comunes
import SplashScreen from "../screens/shared/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

// Stacks de roles
import AdminNavigation from "./AdminNavigation";
import MedicoNavigation from "./MedicoNavigation";
import PacienteNavigation from "./PacienteNavigation";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) return <SplashScreen />; // Muestra cargando mientras se valida la sesión

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // 👤 Usuario no logueado → Login/Register
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : role === "ADMIN" ? (
          // 👑 Admin → navega al stack admin
          <Stack.Screen name="Admin" component={AdminNavigation} />
        ) : role === "MEDICO" ? (
          // 🩺 Medico → navega al stack medico
          <Stack.Screen name="Medico" component={MedicoNavigation} />
        ) : (
          // 👤 Paciente → navega al stack paciente
          <Stack.Screen name="Paciente" component={PacienteNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
