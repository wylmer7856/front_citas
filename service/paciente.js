import api from '../src/api/axiosInstance';

// Obtener paciente por ID
export const getPacienteById = async (id) => {
  const response = await api.get(`/pacientes/${id}`);
  return response.data;
};

// Actualizar paciente
export const updatePaciente = async (id, data) => {
  const response = await api.put(`/pacientes/${id}`, data);
  return response.data;
};

// =======================
//   CITAS DEL PACIENTE
// =======================

// Listar citas del paciente
export const getCitasPaciente = async () => {
  const response = await api.get('/citas/paciente');
  return response.data;
};

// Crear cita
export const createCitaPaciente = async (data) => {
  const response = await api.post('/citas', data);
  return response.data;
};

// Actualizar cita
export const updateCitaPaciente = async (id, data) => {
  const response = await api.put(`/citas/${id}`, data);
  return response.data;
};

// Eliminar cita
export const deleteCitaPaciente = async (id) => {
  const response = await api.delete(`/citas/${id}`);
  return response.data;
};

// Cancelar cita
export const cancelarCitaPaciente = async (id) => {
  const response = await api.put(`/citas/${id}/cancelar`, { estado: 'CANCELADA' });
  return response.data;
};

// Confirmar cita
export const confirmarCitaPaciente = async (id) => {
  const response = await api.put(`/citas/${id}/confirmar`, { estado: 'CONFIRMADA' });
  return response.data;
};

// Obtener el perfil del paciente autenticado
export const getPacienteProfile = async () => {
  const response = await api.get('/pacientes/me');
  return response.data;
};

