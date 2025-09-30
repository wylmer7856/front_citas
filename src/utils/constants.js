// Constantes basadas en la estructura de la base de datos

// Roles de usuario
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MEDICO: 'MEDICO',
  PACIENTE: 'PACIENTE',
};

// Estados de citas
export const CITAS_ESTADOS = {
  PENDIENTE: 'PENDIENTE',
  CONFIRMADA: 'CONFIRMADA',
  CANCELADA: 'CANCELADA',
};

// Días de la semana para horarios
export const DIAS_SEMANA = {
  LUNES: 'LUNES',
  MARTES: 'MARTES',
  MIERCOLES: 'MIERCOLES',
  JUEVES: 'JUEVES',
  VIERNES: 'VIERNES',
  SABADO: 'SABADO',
};

// Especialidades médicas comunes
export const ESPECIALIDADES = [
  'Cardiología',
  'Dermatología',
  'Endocrinología',
  'Gastroenterología',
  'Ginecología',
  'Neurología',
  'Oftalmología',
  'Ortopedia',
  'Pediatría',
  'Psicología',
  'Psiquiatría',
  'Radiología',
  'Urología',
  'Medicina General',
  'Medicina Interna',
];

// Configuración de la aplicación
export const APP_CONFIG = {
  // Timeouts
  API_TIMEOUT: 30000,
  REFRESH_INTERVAL: 30000,
  
  // Límites
  MAX_CITAS_POR_DIA: 10,
  MAX_HORARIOS_POR_MEDICO: 6,
  
  // Formatos de fecha
  DATE_FORMAT: 'YYYY-MM-DD',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'YYYY-MM-DD HH:mm',
  
  // Paginación
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// Mensajes de la aplicación
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Inicio de sesión exitoso',
    REGISTER: 'Registro exitoso',
    CITA_CREATED: 'Cita creada exitosamente',
    CITA_UPDATED: 'Cita actualizada exitosamente',
    CITA_CANCELLED: 'Cita cancelada exitosamente',
    CITA_CONFIRMED: 'Cita confirmada exitosamente',
    PROFILE_UPDATED: 'Perfil actualizado exitosamente',
  },
  ERROR: {
    NETWORK: 'Error de conexión. Verifica tu conexión a internet.',
    UNAUTHORIZED: 'No tienes permisos para realizar esta acción',
    FORBIDDEN: 'Acceso denegado',
    NOT_FOUND: 'Recurso no encontrado',
    VALIDATION: 'Error de validación',
    SERVER: 'Error del servidor. Intenta más tarde.',
    LOGIN_FAILED: 'Credenciales inválidas',
    REGISTER_FAILED: 'Error al crear la cuenta',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'Este campo es obligatorio',
    INVALID_EMAIL: 'Correo electrónico inválido',
    INVALID_PHONE: 'Número de teléfono inválido',
    PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 8 caracteres',
    INVALID_DATE: 'Fecha inválida',
    INVALID_TIME: 'Hora inválida',
  },
};

// Colores de la aplicación
export const COLORS = {
  PRIMARY: '#1976D2',
  SECONDARY: '#26A69A',
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#F44336',
  INFO: '#2196F3',
  LIGHT: '#F5F5F5',
  DARK: '#212121',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: '#9E9E9E',
  LIGHT_GRAY: '#E0E0E0',
  DARK_GRAY: '#616161',
};

// Configuración de navegación
export const NAVIGATION_CONFIG = {
  HEADER_STYLE: {
    backgroundColor: COLORS.PRIMARY,
    headerTintColor: COLORS.WHITE,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  TAB_BAR_STYLE: {
    backgroundColor: COLORS.WHITE,
    activeTintColor: COLORS.PRIMARY,
    inactiveTintColor: COLORS.GRAY,
  },
};








