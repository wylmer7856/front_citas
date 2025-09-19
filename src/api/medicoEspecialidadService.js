import api from "./api";

// Obtener todas las relaciones médico-especialidad
export const getMedicosEspecialidades = async () => {
  try {
    const response = await api.get("/medico-especialidad");
    return response.data;
  } catch (error) {
    console.error("Error al obtener médico-especialidad:", error);
    throw error;
  }
};

// Obtener una relación por ID
export const getMedicoEspecialidadById = async (id) => {
  try {
    const response = await api.get(`/medico-especialidad/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener médico-especialidad con id ${id}:`, error);
    throw error;
  }
};

// Crear una nueva relación médico-especialidad
export const createMedicoEspecialidad = async (data) => {
  try {
    const response = await api.post("/medico-especialidad", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear médico-especialidad:", error);
    throw error;
  }
};

// Actualizar relación existente
export const updateMedicoEspecialidad = async (id, data) => {
  try {
    const response = await api.put(`/medico-especialidad/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar médico-especialidad con id ${id}:`, error);
    throw error;
  }
};

// Eliminar relación médico-especialidad
export const deleteMedicoEspecialidad = async (id) => {
  try {
    const response = await api.delete(`/medico-especialidad/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar médico-especialidad con id ${id}:`, error);
    throw error;
  }
};
