import api from './apiConfig';

export const deleteUser = id => api.delete(`/users/${id}`);
