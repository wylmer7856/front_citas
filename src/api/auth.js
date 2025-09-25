// src/api/auth.js
import ApiService from "../services/ApiService";

// Login de usuario
export const login = (email, password) =>
  ApiService.post("/login", { email, password });

// Registro de usuario
export const register = (payload) =>
  ApiService.post("/register", payload);
// payload = { nombre, apellido, email, telefono, password, rol }

// Logout
export const logout = () => ApiService.post("/logout");
