// src/api/medicoEspecialidad.js
import ApiService from "../services/ApiService";

// ADMIN
export const listarMedicoEspecialidad = () => ApiService.get("/listarmedico-especialidad");
export const crearMedicoEspecialidad = (payload) => ApiService.post("/crearmedico-especialidad", payload);
export const eliminarMedicoEspecialidad = (id) => ApiService.delete(`/eliminarmedico-especialidad/${id}`);
