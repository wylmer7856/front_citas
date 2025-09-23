// src/api/medicoEspecialidadService.js
import axios from './api';

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

// 📋 Listar relaciones médico-especialidad
export const listarAsignaciones = async (token) => {
  return axios.get('/listarmedico-especialidad', authHeader(token));
};

// ➕ Asignar especialidad a un médico (solo admin)
export const asignarEspecialidad = async (id_medico, id_especialidad, token) => {
  return axios.post('/crearmedico-especialidad', {
    id_medico,
    id_especialidad
  }, authHeader(token));
};

// ❌ Eliminar relación médico-especialidad (solo admin)
export const eliminarAsignacion = async (id, token) => {
  return axios.delete(`/eliminarmedico-especialidad/${id}`, authHeader(token));
};
