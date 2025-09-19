// src/navigation/AppNavigation.js
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import AdminNavigation from "./AdminNavigation";
import MedicoNavigation from "./MedicoNavigation";
import PacienteNavigation from "./PacienteNavigation";

// Contexto de autenticación (ejemplo)
import { AuthContext } from "../context/AuthContext";

export default function AppNavigation() {
  const { user } = useContext(AuthContext); // user = { rol: 'admin' | 'medico' | 'paciente', token: '...' }

  return (
    <NavigationContainer>
  {!user ? (
    <AuthNavigation /> // stack de login/register
  ) : user.rol === "ADMIN" ? (
    <AdminNavigation /> // stack completo para admin
  ) : user.rol === "MEDICO" ? (
    <MedicoNavigation />
  ) : user.rol === "PACIENTE" ? (
    <PacienteNavigation />
  ) : (
    <AuthNavigation /> // fallback seguro
  )}
</NavigationContainer>

  );
}
