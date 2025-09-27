import api from './apiConfig';

export const getHorarios = () => api.get('/horarios');
export const createHorario = data => api.post('/horarios', data);
export const deleteHorario = id => api.delete(`/horarios/${id}`);
