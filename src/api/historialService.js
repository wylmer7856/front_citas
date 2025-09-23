// src/api/historialService.js
import axios from './api';

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

// 📋 Listar historiales (admin ve todos, médico y paciente ven los suyos)
export const listarHistoriales = async (token) => {
  return axios.get('/listarhistorial', authHeader(token));
};

// 🔍 Ver historial por ID
export const buscarHistorial = async (id, token) => {
  return axios.get(`/buscarhistorial/${id}`, authHeader(token));
};

// ➕ Crear historial (solo médico)
export const crearHistorial = async (data, token) => {
  return axios.post('/crearhistorial', {
    id_cita: data.id_cita,
    diagnostico: data.diagnostico,
    receta: data.receta,
    observaciones: data.observaciones, // si lo usas en tu modelo
  }, authHeader(token));
};

// ✏️ Editar historial (solo médico dueño de la cita)
export const editarHistorial = async (id, data, token) => {
  return axios.put(`/eliminarhistorial/${id}`, {
    diagnostico: data.diagnostico,
    receta: data.receta,
    observaciones: data.observaciones,
  }, authHeader(token));
};

// ❌ Eliminar historial (solo admin)
export const eliminarHistorial = async (id, token) => {
  return axios.delete(`/historial/${id}`, authHeader(token));
};
