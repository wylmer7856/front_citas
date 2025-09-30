import { CITAS_ESTADOS, DIAS_SEMANA, USER_ROLES, ESPECIALIDADES } from './constants';

// Validadores de campos básicos
export const validateRequired = (value, fieldName = 'Campo') => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} es obligatorio`;
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'El correo electrónico es obligatorio';
  if (!emailRegex.test(email)) return 'Correo electrónico inválido';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'La contraseña es obligatoria';
  if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
  return null;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  const cleanedPhone = phone.replace(/\D/g, '');
  if (!phone) return 'El teléfono es obligatorio';
  if (!phoneRegex.test(cleanedPhone)) return 'Número de teléfono inválido (debe tener 10 dígitos)';
  return null;
};

export const validateName = (name) => {
  if (!name) return 'El nombre es obligatorio';
  if (name.length < 2) return 'El nombre debe tener al menos 2 caracteres';
  if (name.length > 100) return 'El nombre no puede tener más de 100 caracteres';
  return null;
};

// Validadores específicos de la aplicación
export const validateUserRole = (role) => {
  const validRoles = Object.values(USER_ROLES);
  if (!role) return 'El rol es obligatorio';
  if (!validRoles.includes(role)) return 'Rol inválido';
  return null;
};

export const validateCitaEstado = (estado) => {
  const validEstados = Object.values(CITAS_ESTADOS);
  if (!estado) return 'El estado es obligatorio';
  if (!validEstados.includes(estado)) return 'Estado inválido';
  return null;
};

export const validateDiaSemana = (dia) => {
  const validDias = Object.values(DIAS_SEMANA);
  if (!dia) return 'El día de la semana es obligatorio';
  if (!validDias.includes(dia)) return 'Día de la semana inválido';
  return null;
};

export const validateEspecialidad = (especialidad) => {
  if (!especialidad) return 'La especialidad es obligatoria';
  if (!ESPECIALIDADES.includes(especialidad)) return 'Especialidad inválida';
  return null;
};

export const validateFechaNacimiento = (fecha) => {
  if (!fecha) return 'La fecha de nacimiento es obligatoria';
  
  const fechaNacimiento = new Date(fecha);
  const hoy = new Date();
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  
  if (edad < 0) return 'La fecha de nacimiento no puede ser futura';
  if (edad > 120) return 'La edad no puede ser mayor a 120 años';
  if (edad < 0 || edad > 120) return 'Fecha de nacimiento inválida';
  
  return null;
};

export const validateFechaHora = (fechaHora) => {
  if (!fechaHora) return 'La fecha y hora son obligatorias';
  
  const fecha = new Date(fechaHora);
  const hoy = new Date();
  
  if (fecha < hoy) return 'La fecha y hora no pueden ser en el pasado';
  
  return null;
};

export const validateHora = (hora) => {
  if (!hora) return 'La hora es obligatoria';
  
  const horaRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!horaRegex.test(hora)) return 'Formato de hora inválido (HH:mm)';
  
  return null;
};

export const validateHoraInicioFin = (horaInicio, horaFin) => {
  const errorInicio = validateHora(horaInicio);
  if (errorInicio) return errorInicio;
  
  const errorFin = validateHora(horaFin);
  if (errorFin) return errorFin;
  
  if (horaInicio >= horaFin) {
    return 'La hora de inicio debe ser menor que la hora de fin';
  }
  
  return null;
};

// Validadores de formularios completos
export const validateLoginForm = (form) => {
  const errors = {};
  
  const emailError = validateEmail(form.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(form.password);
  if (passwordError) errors.password = passwordError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateRegisterForm = (form) => {
  const errors = {};
  
  const nameError = validateName(form.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(form.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(form.password);
  if (passwordError) errors.password = passwordError;
  
  const roleError = validateUserRole(form.role);
  if (roleError) errors.role = roleError;
  
  // Validaciones específicas por rol
  if (form.role === USER_ROLES.MEDICO) {
    const especialidadError = validateEspecialidad(form.especialidad);
    if (especialidadError) errors.especialidad = especialidadError;
  }
  
  if (form.role === USER_ROLES.PACIENTE) {
    const fechaError = validateFechaNacimiento(form.fecha_nacimiento);
    if (fechaError) errors.fecha_nacimiento = fechaError;
    
    const phoneError = validatePhone(form.telefono);
    if (phoneError) errors.telefono = phoneError;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateCitaForm = (form) => {
  const errors = {};
  
  const medicoError = validateRequired(form.medico_id, 'Médico');
  if (medicoError) errors.medico_id = medicoError;
  
  const pacienteError = validateRequired(form.paciente_id, 'Paciente');
  if (pacienteError) errors.paciente_id = pacienteError;
  
  const fechaError = validateFechaHora(form.fecha_hora);
  if (fechaError) errors.fecha_hora = fechaError;
  
  const motivoError = validateRequired(form.motivo, 'Motivo');
  if (motivoError) errors.motivo = motivoError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateHorarioForm = (form) => {
  const errors = {};
  
  const medicoError = validateRequired(form.medico_id, 'Médico');
  if (medicoError) errors.medico_id = medicoError;
  
  const diaError = validateDiaSemana(form.dia_semana);
  if (diaError) errors.dia_semana = diaError;
  
  const horaError = validateHoraInicioFin(form.hora_inicio, form.hora_fin);
  if (horaError) errors.hora_inicio = horaError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Función helper para validar múltiples campos
export const validateFields = (fields, validators) => {
  const errors = {};
  
  Object.keys(validators).forEach(field => {
    const validator = validators[field];
    const value = fields[field];
    const error = validator(value);
    if (error) {
      errors[field] = error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};








