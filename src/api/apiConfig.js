import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  timeout: 10000,
});

api.interceptors.request.use(config => {
  // Agrega token si existe
  const token = localStorage.getItem('token'); // o AsyncStorage 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
