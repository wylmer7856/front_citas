import { ApiService } from './ApiService';

// Servicios específicos para médicos
export const MedicoService = {
  // Obtener todos los médicos (para admin)
  getAllMedicos: async () => {
    return await ApiService.get('/medicos');
  },

  // Obtener médicos disponibles (para pacientes)
  getMedicosDisponibles: async () => {
    return await ApiService.get('/medicos-disponibles');
  },

  // Obtener médico por ID
  getMedicoById: async (id) => {
    return await ApiService.get(`/medicos/${id}`);
  },

  // Crear nuevo médico
  createMedico: async (data) => {
    return await ApiService.post('/medicos', data);
  },

  // Actualizar médico
  updateMedico: async (id, data) => {
    return await ApiService.put(`/medicos/${id}`, data);
  },

  // Eliminar médico
  deleteMedico: async (id) => {
    return await ApiService.delete(`/medicos/${id}`);
  },

  // Obtener horarios del médico
  getHorariosMedico: async () => {
    return await ApiService.get('/horarios');
  },

  // Crear horario para médico
  createHorario: async (data) => {
    return await ApiService.post('/horarios', data);
  },

  // Eliminar horario
  deleteHorario: async (id) => {
    return await ApiService.delete(`/horarios/${id}`);
  },

  // Obtener citas del médico autenticado
  getCitasMedico: async () => {
    return await ApiService.get('/Mcitas');
  },

  // Obtener perfil del médico autenticado
  getPerfil: async () => {
    // Usamos directamente el endpoint /me para obtener los datos del usuario autenticado
    return await ApiService.get('/me');
  },

  // Actualizar perfil del médico autenticado
  updatePerfil: async (data) => {
    // Usamos directamente el endpoint /me para actualizar los datos del usuario autenticado
    return await ApiService.put('/me', data);
  },
   
  // Confirmar una cita
  confirmarCita: async (id) => {
    return await ApiService.put(`/Mcitas/${id}`, { estado: "CONFIRMADA" });
  }
};
