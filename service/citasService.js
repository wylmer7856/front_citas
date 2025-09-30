import { ApiService } from './ApiService';

// Servicios específicos para citas
export const CitasService = {
  // Obtener todas las citas
  getAllCitas: async () => {
    return await ApiService.get('/citas');
  },

  // Obtener cita por ID
  getCitaById: async (id) => {
    return await ApiService.get(`/citas/${id}`);
  },

  // Crear nueva cita
  createCita: async (data) => {
    return await ApiService.post('/citas', data);
  },

  // Actualizar cita
  updateCita: async (id, data) => {
    return await ApiService.put(`/citas/${id}`, data);
  },

  // Eliminar cita
  deleteCita: async (id) => {
    return await ApiService.delete(`/citas/${id}`);
  },

  // Cancelar cita
  cancelarCita: async (id) => {
    return await ApiService.put(`/citas/${id}/cancelar`);
  },

  // Confirmar cita
  confirmarCita: async (id) => {
    return await ApiService.put(`/citas/${id}/confirmar`);
  },

  // Obtener citas por médico
  getCitasByMedico: async (medicoId) => {
    return await ApiService.get(`/medicos/${medicoId}/citas`);
  },

  // Obtener citas por paciente
  getCitasByPaciente: async (pacienteId) => {
    return await ApiService.get(`/pacientes/${pacienteId}/citas`);
  },

  // Obtener citas por fecha
  getCitasByFecha: async (fecha) => {
    return await ApiService.get(`/citas?fecha=${fecha}`);
  },

  // Obtener citas por estado
  getCitasByEstado: async (estado) => {
    return await ApiService.get(`/citas?estado=${estado}`);
  },
};
