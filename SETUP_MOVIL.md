# Configuración para Móvil - App de Citas Médicas

## 📱 Instrucciones de Configuración

### 1. Instalar Dependencias
```bash
cd front_citas
npm install
```

### 2. Configurar la Conexión al Backend

**IMPORTANTE**: La IP del servidor backend está configurada en `service/conexion.js`

1. **Edita el archivo `service/conexion.js`:**
   - Cambia la IP en `API_BASE_URL` por tu IP local
   - Ejemplo: `http://192.168.1.100:8000/api`

2. **Para encontrar tu IP local:**
   - Windows: Abre cmd y ejecuta `ipconfig`
   - Mac/Linux: Abre terminal y ejecuta `ifconfig`

### 3. Ejecutar el Proyecto

#### Para Android:
```bash
npm run android
```

#### Para iOS:
```bash
npm run ios
```

#### Para Web:
```bash
npm run web
```

#### Modo desarrollo:
```bash
npm start
```

### 4. Configuración del Backend

Asegúrate de que tu servidor backend esté corriendo en el puerto 8000 y que permita conexiones desde la red local.

### 5. Solución de Problemas Comunes

#### Error de conexión de red:
- Verifica que la IP en `service/conexion.js` sea correcta
- Asegúrate de que el backend esté corriendo
- Para Android físico, usa la IP real de tu máquina

#### Error de permisos en Android:
- Asegúrate de tener habilitado el "Modo desarrollador" en tu dispositivo
- Habilita "Depuración USB"

#### Error en iOS:
- Asegúrate de tener Xcode instalado
- Verifica que el simulador esté funcionando

### 6. Nueva Estructura del Proyecto (Siguiendo APP-EPS)

```
front_citas/
├── Screen/                    # Pantallas organizadas por módulos
│   ├── Auth/                  # Autenticación (Login, Register)
│   ├── Admin/                 # Pantallas de administrador
│   ├── Medico/                # Pantallas de médico
│   ├── Paciente/              # Pantallas de paciente
│   ├── Dashboard/             # Dashboards
│   ├── Inicio/                # Pantalla de inicio
│   └── Citas/                 # Gestión de citas
├── service/                   # Servicios de API
│   ├── ApiService.js          # Servicio principal de API
│   ├── conexion.js            # Configuración de conexión
│   ├── auth.js                # Servicios de autenticación
│   ├── medicoService.js       # Servicios de médico
│   ├── pacienteService.js     # Servicios de paciente
│   └── administradoresService.js # Servicios de admin
├── src/
│   ├── components/           # Componentes reutilizables
│   ├── context/              # Context API
│   ├── hooks/                # Hooks personalizados
│   │   └── useAutoRefresh.js # Hook para auto-refresh
│   ├── navigation/           # Navegación
│   └── utils/               # Utilidades
├── App.js                   # Componente principal
└── package.json            # Dependencias
```

### 7. Servicios Disponibles

- **ApiService**: Servicio principal con interceptores automáticos
- **AuthService**: Manejo de autenticación y tokens
- **MedicoService**: Operaciones específicas de médicos
- **PacienteService**: Operaciones específicas de pacientes
- **AdministradoresService**: Operaciones de administración
- **CitasService**: Gestión completa de citas
- **HorariosService**: Gestión de horarios médicos
- **UsuariosService**: Gestión de usuarios
- **EstadisticasService**: Reportes y estadísticas

### 8. Características Implementadas

- ✅ **Interceptores automáticos** para tokens de autenticación
- ✅ **Manejo de errores 401** con limpieza automática de tokens
- ✅ **Timeout configurable** (30 segundos por defecto)
- ✅ **Auto-refresh** con hook personalizado
- ✅ **Estructura modular** siguiendo patrón APP-EPS
- ✅ **Servicios organizados** por funcionalidad
- ✅ **Validaciones completas** para todos los formularios
- ✅ **Formateadores de datos** para fechas, horas y texto
- ✅ **Constantes centralizadas** para roles, estados y configuración
- ✅ **Integración completa** con la estructura de base de datos

### 9. Roles de Usuario

La app maneja tres tipos de usuarios:
- **ADMIN**: Gestión completa del sistema
- **MEDICO**: Gestión de citas y horarios
- **PACIENTE**: Solicitud de citas

### 10. Estructura de Base de Datos

La aplicación está diseñada para trabajar con la siguiente estructura de base de datos:

#### Tablas Principales:
- **users**: Usuarios del sistema (ADMIN, MEDICO, PACIENTE)
- **medicos**: Información específica de médicos (especialidad)
- **pacientes**: Información específica de pacientes (fecha_nacimiento, teléfono)
- **citas**: Citas médicas (estados: PENDIENTE, CONFIRMADA, CANCELADA)
- **horarios**: Horarios de disponibilidad de médicos por día

#### Relaciones:
- Un usuario puede ser médico O paciente (no ambos)
- Las citas relacionan médicos con pacientes
- Los horarios pertenecen a médicos específicos
- Sistema de autenticación con tokens de acceso

### 11. Notas Importantes

- El proyecto usa Expo para facilitar el desarrollo
- Las dependencias están optimizadas para React Native
- La configuración de red está centralizada en `service/conexion.js`
- Se incluye manejo automático de tokens y errores
- Estructura reorganizada siguiendo el patrón de APP-EPS
- Todos los servicios están adaptados a la estructura de la base de datos
- Validaciones y formateadores basados en los campos de la BD
