import { ApiService } from './ApiService';

// Servicios específicos para horarios
export const HorariosService = {
  // Obtener todos los horarios
  getAllHorarios: async () => {
    return await ApiService.get('/horarios');
  },

  // Crear nuevo horario
  createHorario: async (data) => {
    return await ApiService.post('/horarios', data);
  },


  // Eliminar horario
  deleteHorario: async (id) => {
    return await ApiService.delete(`/horarios/${id}`);
  },


  // Obtener horarios por día de la semana
  getHorariosByDia: async (diaSemana) => {
    return await ApiService.get(`/horarios?dia_semana=${diaSemana}`);
  },

};





