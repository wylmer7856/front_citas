import moment from 'moment';
import { CITAS_ESTADOS, DIAS_SEMANA, USER_ROLES } from './constants';

// Formateadores de fecha y hora
export const formatDate = (date, format = 'DD/MM/YYYY') => {
  if (!date) return '';
  return moment(date).format(format);
};

export const formatTime = (time, format = 'HH:mm') => {
  if (!time) return '';
  return moment(time, 'HH:mm:ss').format(format);
};

export const formatDateTime = (dateTime, format = 'DD/MM/YYYY HH:mm') => {
  if (!dateTime) return '';
  return moment(dateTime).format(format);
};

// Formateadores de datos específicos
export const formatCitaEstado = (estado) => {
  const estados = {
    [CITAS_ESTADOS.PENDIENTE]: 'Pendiente',
    [CITAS_ESTADOS.CONFIRMADA]: 'Confirmada',
    [CITAS_ESTADOS.CANCELADA]: 'Cancelada',
  };
  return estados[estado] || estado;
};

export const formatUserRole = (role) => {
  const roles = {
    [USER_ROLES.ADMIN]: 'Administrador',
    [USER_ROLES.MEDICO]: 'Médico',
    [USER_ROLES.PACIENTE]: 'Paciente',
  };
  return roles[role] || role;
};

export const formatDiaSemana = (dia) => {
  const dias = {
    [DIAS_SEMANA.LUNES]: 'Lunes',
    [DIAS_SEMANA.MARTES]: 'Martes',
    [DIAS_SEMANA.MIERCOLES]: 'Miércoles',
    [DIAS_SEMANA.JUEVES]: 'Jueves',
    [DIAS_SEMANA.VIERNES]: 'Viernes',
    [DIAS_SEMANA.SABADO]: 'Sábado',
  };
  return dias[dia] || dia;
};

// Formateadores de números
export const formatPhone = (phone) => {
  if (!phone) return '';
  // Formato: (XXX) XXX-XXXX
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

export const formatCurrency = (amount) => {
  if (!amount) return '$0';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(amount);
};

// Formateadores de texto
export const capitalizeFirst = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeWords = (text) => {
  if (!text) return '';
  return text.split(' ').map(capitalizeFirst).join(' ');
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Formateadores de edad
export const calculateAge = (fechaNacimiento) => {
  if (!fechaNacimiento) return 0;
  return moment().diff(moment(fechaNacimiento), 'years');
};

// Formateadores de tiempo relativo
export const getRelativeTime = (date) => {
  if (!date) return '';
  return moment(date).fromNow();
};

// Formateadores de validación
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const isValidDate = (date) => {
  return moment(date).isValid();
};

// Formateadores de datos para la API
export const formatCitaForAPI = (cita) => {
  return {
    medico_id: cita.medico_id,
    paciente_id: cita.paciente_id,
    fecha_hora: moment(cita.fecha_hora).format('YYYY-MM-DD HH:mm:ss'),
    motivo: cita.motivo,
  };
};

export const formatHorarioForAPI = (horario) => {
  return {
    medico_id: horario.medico_id,
    dia_semana: horario.dia_semana,
    hora_inicio: horario.hora_inicio,
    hora_fin: horario.hora_fin,
  };
};

export const formatUserForAPI = (user) => {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
  };
};

// Formateadores de datos desde la API
export const formatCitaFromAPI = (cita) => {
  return {
    ...cita,
    fecha_hora_formatted: formatDateTime(cita.fecha_hora),
    estado_formatted: formatCitaEstado(cita.estado),
    medico_nombre: cita.medico?.name || '',
    paciente_nombre: cita.paciente?.name || '',
  };
};

export const formatHorarioFromAPI = (horario) => {
  return {
    ...horario,
    dia_semana_formatted: formatDiaSemana(horario.dia_semana),
    hora_inicio_formatted: formatTime(horario.hora_inicio),
    hora_fin_formatted: formatTime(horario.hora_fin),
    medico_nombre: horario.medico?.name || '',
  };
};

export const formatUserFromAPI = (user) => {
  return {
    ...user,
    role_formatted: formatUserRole(user.role),
    created_at_formatted: formatDate(user.created_at),
  };
};








