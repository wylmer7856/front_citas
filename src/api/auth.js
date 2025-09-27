import api from './apiConfig';

export const register = data => api.post('/register', data);
export const login = data => api.post('/login', data);
export const logout = () => api.post('/logout');
export const getProfile = () => api.get('/me');
export const updateProfile = data => api.put('/me', data);
