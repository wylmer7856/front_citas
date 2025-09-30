import { ApiService } from './ApiService';

// Servicios específicos para usuarios
export const UsuariosService = {
  // Obtener todos los usuarios
  getAllUsuarios: async () => {
    return await ApiService.get('/usuarios');
  },

  // Obtener usuario por ID
  getUsuarioById: async (id) => {
    return await ApiService.get(`/usuarios/${id}`);
  },

  // Crear nuevo usuario
  createUsuario: async (data) => {
    return await ApiService.post('/usuarios', data);
  },

  // Actualizar usuario
  updateUsuario: async (id, data) => {
    return await ApiService.put(`/usuarios/${id}`, data);
  },

  // Eliminar usuario
  deleteUsuario: async (id) => {
    return await ApiService.delete(`/usuarios/${id}`);
  },

  // Obtener usuarios por rol
  getUsuariosByRol: async (role) => {
    return await ApiService.get(`/usuarios?role=${role}`);
  },

  // Obtener todos los médicos
  getAllMedicos: async () => {
    return await ApiService.get('/usuarios?role=MEDICO');
  },

  // Obtener todos los pacientes
  getAllPacientes: async () => {
    return await ApiService.get('/usuarios?role=PACIENTE');
  },

  // Obtener todos los administradores
  getAllAdministradores: async () => {
    return await ApiService.get('/usuarios?role=ADMIN');
  },

  // Buscar usuarios por nombre
  buscarUsuarios: async (query) => {
    return await ApiService.get(`/usuarios/search?q=${query}`);
  },

  // Cambiar contraseña
  cambiarPassword: async (id, data) => {
    return await ApiService.put(`/usuarios/${id}/password`, data);
  },

  // Activar/Desactivar usuario
  toggleUsuario: async (id) => {
    return await ApiService.put(`/usuarios/${id}/toggle`);
  },
};








