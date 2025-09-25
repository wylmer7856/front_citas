// src/api/historial.js
import ApiService from "../services/ApiService";

// ADMIN + MEDICO
export const listarHistoriales = () => ApiService.get("/listarhistorial");
export const detalleHistorial = (id) => ApiService.get(`/buscarhistorial/${id}`);
export const crearHistorial = (payload) => ApiService.post("/crearhistorial", payload);
export const editarHistorial = (id, payload) => ApiService.put(`/eliminarhistorial/${id}`, payload); 
export const eliminarHistorial = (id) => ApiService.delete(`/historial/${id}`);
