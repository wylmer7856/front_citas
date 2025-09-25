// src/utils/validators.js

// Email válido
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Contraseña mínima de 6 caracteres
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Campos requeridos
export const isRequired = (value) => {
  return value !== null && value !== undefined && value !== "";
};
