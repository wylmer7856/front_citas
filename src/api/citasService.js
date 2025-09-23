// src/api/citasService.js
import axios from './api';

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

// 📋 Listar citas (admin ve todas, médico y paciente ven las suyas)
export const listarCitas = async (token) => {
  return axios.get('/listarcitas', authHeader(token));
};

// 🔍 Ver cita por ID
export const buscarCita = async (id, token) => {
  return axios.get(`/buscarcitas/${id}`, authHeader(token));
};

// ➕ Crear cita (médico o paciente)
export const crearCita = async (data, token) => {
  return axios.post('/crearcitas', {
    id_paciente: data.id_paciente,
    id_medico_especialidad: data.id_medico_especialidad,
    fecha: data.fecha,
    hora: data.hora,
    estado: data.estado, // 'PENDIENTE', 'CONFIRMADA', etc.
  }, authHeader(token));
};

// ✏️ Editar cita (médico o paciente)
export const editarCita = async (id, data, token) => {
  return axios.put(`/editarcitas/${id}`, {
    id_paciente: data.id_paciente,
    id_medico_especialidad: data.id_medico_especialidad,
    fecha: data.fecha,
    hora: data.hora,
    estado: data.estado,
  }, authHeader(token));
};

// ❌ Eliminar cita (médico o paciente)
export const eliminarCita = async (id, token) => {
  return axios.delete(`/eliminarcitas/${id}`, authHeader(token));
};
