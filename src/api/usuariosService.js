// src/api/usuariosService.js
import axios from './api';

// 🔐 Token helper
const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

// 📋 Listar todos los usuarios (solo admin)
export const listarUsuarios = async (token) => {
  return axios.get('/listarusuarios', authHeader(token));
};

// ➕ Crear usuario (solo admin)
export const crearUsuario = async (data, token) => {
  return axios.post('/Crearusuarios', {
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    password: data.password,
    tipo_usuario: data.tipo_usuario, // 'ADMIN', 'MEDICO', 'PACIENTE'
  }, authHeader(token));
};

// 🔍 Buscar usuario por ID
export const buscarUsuario = async (id, token) => {
  return axios.get(`/buscrausuarios/${id}`, authHeader(token));
};

// ✏️ Editar usuario
export const editarUsuario = async (id, data, token) => {
  return axios.put(`/editarusuarios/${id}`, {
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    tipo_usuario: data.tipo_usuario,
    password: data.password, // opcional
  }, authHeader(token));
};

// ❌ Eliminar usuario
export const eliminarUsuario = async (id, token) => {
  return axios.delete(`/eliminarusuarios/${id}`, authHeader(token));
};
