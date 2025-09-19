// src/api/especialidadesService.js
import api from "./api";

const getEspecialidades = async () => {
  const res = await api.get("/especialidades");
  return res.data;
};

const getEspecialidad = async (id) => {
  const res = await api.get(`/especialidades/${id}`);
  return res.data;
};

const createEspecialidad = async (data) => {
  const res = await api.post("/especialidades", data);
  return res.data;
};

const updateEspecialidad = async (id, data) => {
  const res = await api.put(`/especialidades/${id}`, data);
  return res.data;
};

const deleteEspecialidad = async (id) => {
  const res = await api.delete(`/especialidades/${id}`);
  return res.data;
};

export default {
  getEspecialidades,
  getEspecialidad,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad,
};
