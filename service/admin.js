// src/api/admin.js
import api from './axiosInstance';

/**
 * Usuarios
 */
export const getUsuarios = async () => {
  const res = await api.get('/usuarios');
  return res.data;
};

export const deleteUsuario = async (id) => {
  const res = await api.delete(`/usuarios/${id}`);
  return res.data;
};

/**
 * Médicos
 */
export const getMedicos = async () => {
  const res = await api.get('/medicos');
  return res.data;
};

export const deleteMedico = async (id) => {
  const res = await api.delete(`/medicos/${id}`);
  return res.data;
};

/**
 * Pacientes
 */
export const getPacientes = async () => {
  const res = await api.get('/pacientes');
  return res.data;
};

export const deletePaciente = async (id) => {
  const res = await api.delete(`/pacientes/${id}`);
  return res.data;
};

/**
 * Citas (admin)
 */
export const getCitasAdmin = async () => {
  const res = await api.get('/Acitas');
  return res.data;
};

export const deleteCitaAdmin = async (id) => {
  const res = await api.delete(`/Acitas/${id}`);
  return res.data;
};
