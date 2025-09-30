export const ROLES = {
  ADMIN: 'ADMIN',
  MEDICO: 'MEDICO',
  PACIENTE: 'PACIENTE',
};

export const roleLabels = {
  ADMIN: 'Administrador',
  MEDICO: 'Médico',
  PACIENTE: 'Paciente',
};

export const isAdmin = (user) => user?.role === ROLES.ADMIN;
export const isMedico = (user) => user?.role === ROLES.MEDICO;
export const isPaciente = (user) => user?.role === ROLES.PACIENTE;
