// src/api/especialidades.js
import ApiService from "../services/ApiService";

// ADMIN
export const listarEspecialidades = () => ApiService.get("/listarespecialidades");
export const crearEspecialidad = (payload) => ApiService.post("/crearespecialidades", payload);
export const editarEspecialidad = (id, payload) => ApiService.put(`/editarespecialidades/${id}`, payload);
export const eliminarEspecialidad = (id) => ApiService.delete(`/eliminarespecialidades/${id}`);

// ADMIN + MEDICO
export const detalleEspecialidad = (id) => ApiService.get(`/buscareespecialidades/${id}`);
