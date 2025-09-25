// src/utils/dateUtils.js
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

// Formato DD/MM/YYYY
export const formatDate = (date) => {
  if (!date) return "";
  return format(parseISO(date), "dd/MM/yyyy", { locale: es });
};

// Formato con hora
export const formatDateTime = (date) => {
  if (!date) return "";
  return format(parseISO(date), "dd/MM/yyyy HH:mm", { locale: es });
};

// Fecha actual en ISO
export const todayISO = () => {
  return new Date().toISOString().split("T")[0];
};
