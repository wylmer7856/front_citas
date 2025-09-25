// src/utils/permissions.js
import { ROLES } from "./constants";

// Validar acceso por rol
export const canAccess = (role, allowedRoles) => {
  return allowedRoles.includes(role);
};

// Ejemplos de permisos
export const PERMISSIONS = {
  ADMIN: {
    usuarios: [ROLES.ADMIN],
    especialidades: [ROLES.ADMIN],
    asignaciones: [ROLES.ADMIN],
    historiales: [ROLES.ADMIN],
  },
  MEDICO: {
    citas: [ROLES.MEDICO],
    historiales: [ROLES.MEDICO],
    especialidades: [ROLES.MEDICO],
  },
  PACIENTE: {
    citas: [ROLES.PACIENTE],
    historiales: [ROLES.PACIENTE],
  },
};
