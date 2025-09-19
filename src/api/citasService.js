// src/api/citasService.js
import api from "./api";

const getCitas = async () => {
  const res = await api.get("/citas");
  return res.data;
};

const getCita = async (id) => {
  const res = await api.get(`/citas/${id}`);
  return res.data;
};

const createCita = async (data) => {
  const res = await api.post("/citas", data);
  return res.data;
};

const updateCita = async (id, data) => {
  const res = await api.put(`/citas/${id}`, data);
  return res.data;
};

const deleteCita = async (id) => {
  const res = await api.delete(`/citas/${id}`);
  return res.data;
};

export default {
  getCitas,
  getCita,
  createCita,
  updateCita,
  deleteCita,
};
