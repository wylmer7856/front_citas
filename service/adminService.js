import { ApiService } from './ApiService';

// Servicios específicos para el administrador
export const AdminService = {
  // Gestión de usuarios
  getAllUsers: async () => {
    return await ApiService.get('/usuarios');
  },
  
  deleteUser: async (id) => {
    return await ApiService.delete(`/usuarios/${id}`);
  },
  
  // Gestión de médicos
  getAllMedicos: async () => {
    return await ApiService.get('/medicos');
  },
  
  deleteMedico: async (id) => {
    return await ApiService.delete(`/medicos/${id}`);
  },
  
  // Gestión de pacientes
  getAllPacientes: async () => {
    return await ApiService.get('/pacientes');
  },
  
  deletePaciente: async (id) => {
    return await ApiService.delete(`/pacientes/${id}`);
  },
  
  // Gestión de citas
  getAllCitas: async () => {
    return await ApiService.get('/Acitas');
  },
  
  deleteCita: async (id) => {
    return await ApiService.delete(`/Acitas/${id}`);
  }
};