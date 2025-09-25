// src/api/usuarios.js
import ApiService from "../services/ApiService";

// ADMIN
export const listarUsuarios = () => ApiService.get("/listarusuarios");
export const crearUsuario = (payload) => ApiService.post("/Crearusuarios", payload);
export const detalleUsuario = (id) => ApiService.get(`/buscrausuarios/${id}`);
export const editarUsuario = (id, payload) => ApiService.put(`/editarusuarios/${id}`, payload);
export const eliminarUsuario = (id) => ApiService.delete(`/eliminarusuarios/${id}`);
