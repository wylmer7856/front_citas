// src/services/ApiService.js
import axios from "axios";
import StorageService from "./StorageService";

// 🔗 Cambia por la URL de tu backend Laravel
const ApiService = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 10000,
});

// ✅ Interceptor: agrega token en cada request
ApiService.interceptors.request.use(async (config) => {
  const token = await StorageService.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default ApiService;
