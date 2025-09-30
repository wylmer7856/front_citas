import { ApiService } from './ApiService';

// Servicios específicos para pacientes
export const PacienteService = {
  // Obtener todos los pacientes
  getAllPacientes: async () => {
    return await ApiService.get('/pacientes');
  },

  // Obtener perfil del paciente por ID (usando endpoint de paciente)
  getPacienteById: async (id) => {
    return await ApiService.get(`/pacientes/${id}`);
  },

  // Obtener perfil del paciente autenticado
  getPacienteProfile: async () => {
    return await ApiService.get('/pacientes/me');
  },

  // Actualizar perfil del paciente
  updatePaciente: async (id, data) => {
    return await ApiService.put(`/pacientes/${id}`, data);
  },

  // Obtener citas del paciente (usando endpoint de paciente)
  getCitasPaciente: async () => {
    return await ApiService.get('/citas/paciente');
  },

  // Crear nueva cita (usando endpoint de paciente)
  createCita: async (data) => {
    return await ApiService.post('/citas', data);
  },

  // Actualizar cita (usando endpoint de paciente)
  updateCita: async (id, data) => {
    return await ApiService.put(`/citas/${id}`, data);
  },

  // Eliminar cita (usando endpoint de paciente)
  deleteCita: async (id) => {
    return await ApiService.delete(`/citas/${id}`);
  },

  // Cancelar cita (actualizando estado)
  cancelarCita: async (id) => {
    return await ApiService.put(`/citas/${id}/cancelar`, { estado: 'CANCELADA' });
  },

  // Confirmar cita (actualizando estado)
  confirmarCita: async (id) => {
    return await ApiService.put(`/citas/${id}/confirmar`, { estado: 'CONFIRMADA' });
  },
};
