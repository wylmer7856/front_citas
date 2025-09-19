export const ROLES = {
  ADMIN: "admin",
  MEDICO: "medico",
  PACIENTE: "paciente",
};

export const PERMISOS = {
  [ROLES.ADMIN]: ["usuarios", "especialidades", "citas", "historial"],
  [ROLES.MEDICO]: ["citas", "historial", "especialidades"],
  [ROLES.PACIENTE]: ["citas", "historial"],
};
