import api from './apiConfig';

export const getMedicos = () => api.get('/medicos');
export const getMedico = id => api.get(`/medicos/${id}`);
export const createMedico = data => api.post('/medicos', data);
export const updateMedico = (id, data) => api.put(`/medicos/${id}`, data);
export const deleteMedico = id => api.delete(`/medicos/${id}`);
