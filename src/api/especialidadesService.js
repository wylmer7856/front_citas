// src/api/especialidadesService.js
import axios from './api';

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

// 📋 Listar todas las especialidades (admin y médico)
export const listarEspecialidades = async (token) => {
  return axios.get('/listarespecialidades', authHeader(token));
};

// 🔍 Ver una especialidad por ID
export const buscarEspecialidad = async (id, token) => {
  return axios.get(`/buscareespecialidades/${id}`, authHeader(token));
};

// ➕ Crear una especialidad (solo admin)
export const crearEspecialidad = async (nombre, token) => {
  return axios.post('/crearespecialidades', { nombre }, authHeader(token));
};

// ✏️ Editar una especialidad (solo admin)
export const editarEspecialidad = async (id, nombre, token) => {
  return axios.put(`/editarespecialidades/${id}`, { nombre }, authHeader(token));
};

// ❌ Eliminar una especialidad (solo admin)
export const eliminarEspecialidad = async (id, token) => {
  return axios.delete(`/eliminarespecialidades/${id}`, authHeader(token));
};
