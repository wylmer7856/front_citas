import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa las navegaciones
import InicioScreen from "./src/screens/Inicio/InicioScreen";
import AuthNavigation from "./src/Navigation/AuthNavigation";
import AdminNavigation from "./src/Navigation/AdminNavigation";
import MedicoNavigation from "./src/Navigation/MedicoNavigation";
import PacienteNavigation from "./src/Navigation/PacienteNavigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator initialRouteName="Inicio">
        {/* Pantalla inicial */}
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ headerShown: false }}
        />

        {/* Navegación de autenticación */}
        <Stack.Screen
          name="Auth"
          component={AuthNavigation}
          options={{ headerShown: false }}
        />

        {/* Navegaciones según rol */}
        <Stack.Screen
          name="Admin"
          component={AdminNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Medico"
          component={MedicoNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Paciente"
          component={PacienteNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
