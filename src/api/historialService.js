// src/api/historialService.js
import api from "./api";

export const getHistorial = async () => {
  const res = await api.get("/historial");
  return res.data;
};

export const getHistorialById = async (id) => {
  const res = await api.get(`/historial/${id}`);
  return res.data;
};

export const createHistorial = async (data) => {
  const res = await api.post("/historial", data);
  return res.data;
};

export const updateHistorial = async (id, data) => {
  const res = await api.put(`/historial/${id}`, data);
  return res.data;
};

export const deleteHistorial = async (id) => {
  const res = await api.delete(`/historial/${id}`);
  return res.data;
};
