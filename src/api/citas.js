// src/api/citas.js
import ApiService from "../services/ApiService";

// MEDICO + PACIENTE
export const listarCitas = () => ApiService.get("/listarcitas");
export const crearCita = (payload) => ApiService.post("/crearcitas", payload);
export const detalleCita = (id) => ApiService.get(`/buscarcitas/${id}`);
export const editarCita = (id, payload) => ApiService.put(`/editarcitas/${id}`, payload);
export const eliminarCita = (id) => ApiService.delete(`/eliminarcitas/${id}`);
