import { ApiService } from './ApiService';

// Servicios específicos para administradores
export const AdministradoresService = {
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

  // Obtener todas las citas
  getAllCitas: async () => {
    return await ApiService.get('/citas');
  },

  // Obtener estadísticas generales
  getEstadisticas: async () => {
    return await ApiService.get('/estadisticas');
  },

  // Obtener estadísticas de citas
  getEstadisticasCitas: async () => {
    return await ApiService.get('/estadisticas/citas');
  },

  // Obtener estadísticas de usuarios
  getEstadisticasUsuarios: async () => {
    return await ApiService.get('/estadisticas/usuarios');
  },

  // Obtener reportes
  getReportes: async (fechaInicio, fechaFin) => {
    return await ApiService.get(`/reportes?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  },
};








