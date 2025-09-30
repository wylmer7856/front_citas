import { ApiService } from './ApiService';

// Servicios específicos para estadísticas
export const EstadisticasService = {
  // Obtener estadísticas generales
  getEstadisticasGenerales: async () => {
    return await ApiService.get('/estadisticas');
  },

  // Obtener estadísticas de usuarios
  getEstadisticasUsuarios: async () => {
    return await ApiService.get('/estadisticas/usuarios');
  },

  // Obtener estadísticas de citas
  getEstadisticasCitas: async () => {
    return await ApiService.get('/estadisticas/citas');
  },

  // Obtener estadísticas de médicos
  getEstadisticasMedicos: async () => {
    return await ApiService.get('/estadisticas/medicos');
  },

  // Obtener estadísticas de pacientes
  getEstadisticasPacientes: async () => {
    return await ApiService.get('/estadisticas/pacientes');
  },

  // Obtener estadísticas por período
  getEstadisticasPorPeriodo: async (fechaInicio, fechaFin) => {
    return await ApiService.get(`/estadisticas/periodo?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  },

  // Obtener citas por mes
  getCitasPorMes: async (año) => {
    return await ApiService.get(`/estadisticas/citas/mes?year=${año}`);
  },

  // Obtener citas por día de la semana
  getCitasPorDiaSemana: async () => {
    return await ApiService.get('/estadisticas/citas/dia-semana');
  },

  // Obtener médicos más solicitados
  getMedicosMasSolicitados: async (limite = 10) => {
    return await ApiService.get(`/estadisticas/medicos/mas-solicitados?limite=${limite}`);
  },

  // Obtener especialidades más populares
  getEspecialidadesPopulares: async () => {
    return await ApiService.get('/estadisticas/especialidades/populares');
  },

  // Obtener reporte de citas canceladas
  getReporteCitasCanceladas: async (fechaInicio, fechaFin) => {
    return await ApiService.get(`/estadisticas/citas/canceladas?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  },

  // Obtener reporte de citas confirmadas
  getReporteCitasConfirmadas: async (fechaInicio, fechaFin) => {
    return await ApiService.get(`/estadisticas/citas/confirmadas?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`);
  },
};








