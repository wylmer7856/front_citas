// src/api/medico.js
import api from './axiosInstance';

/**
 * Obtener perfil del médico autenticado
 * - Primero consulta /me para saber el id
 * - Luego consulta /medicos/{id}
 */
export const getPerfilMedico = async () => {
  const meRes = await api.get('/me');
  const medicoId = meRes.data.id; // 👈 el backend devuelve el usuario logueado
  const perfilRes = await api.get(`/medicos/${medicoId}`);
  return perfilRes.data;
};

/**
 * Actualizar perfil del médico autenticado
 */
export const updatePerfilMedico = async (data) => {
  const meRes = await api.get('/me');
  const medicoId = meRes.data.id;
  const updatedRes = await api.put(`/medicos/${medicoId}`, data);
  return updatedRes.data;
};

/**
 * Obtener todos los horarios del médico
 */
export const getHorarios = async () => {
  const res = await api.get('/horarios');
  return res.data;
};

/**
 * Crear un nuevo horario
 */
export const createHorario = async (data) => {
  const res = await api.post('/horarios', data);
  return res.data;
};

/**
 * Eliminar un horario por ID
 */
export const deleteHorario = async (id) => {
  const res = await api.delete(`/horarios/${id}`);
  return res.data;
};

/**
 * Obtener citas propias del médico
 */
export const getCitasMedico = async () => {
  const res = await api.get('/Mcitas');
  return res.data;
};

/**
 * Actualizar una cita del médico
 */
export const updateCitaMedico = async (id, data) => {
  const res = await api.put(`/Mcitas/${id}`, data);
  return res.data;
};
