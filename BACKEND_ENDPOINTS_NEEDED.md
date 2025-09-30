# 🔧 Endpoints del Backend Disponibles

¡Excelente! Ya tienes implementados los endpoints necesarios. Aquí está la documentación de los endpoints que ya funcionan:

## ✅ Endpoints Implementados

### 1. **Obtener Datos del Paciente**
```
GET /api/Ppacientes/{id}
```
**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta esperada:**
```json
{
  "id": 2,
  "user_id": 4,
  "telefono": "3228664513",
  "fecha_nacimiento": "2000-05-08",
  "created_at": "2025-09-30T02:05:07.000000Z",
  "updated_at": "2025-09-30T02:05:07.000000Z",
  "user": {
    "id": 4,
    "name": "Wilmer andres morales",
    "email": "moraleswm@mail.com",
    "role": "PACIENTE"
  }
}
```

### 2. **Obtener Citas del Paciente**
```
GET /api/Pcitas
```
**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Respuesta esperada:**
```json
[
  {
    "id": 4,
    "medico_id": 1,
    "paciente_id": 2,
    "fecha_hora": "2025-09-12T12:26:33.000000Z",
    "estado": "CANCELADA",
    "motivo": "dolor de cabeza",
    "created_at": "2025-09-30T00:26:33.000000Z",
    "updated_at": "2025-09-30T07:20:06.000000Z",
    "medico": {
      "id": 1,
      "especialidad": "Cardiología",
      "user": {
        "id": 3,
        "name": "dr camila",
        "email": "cami@mail.com"
      }
    }
  }
]
```

### 3. **Crear Nueva Cita**
```
POST /api/Pcitas
```
**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "medico_id": 1,
  "fecha_hora": "2025-10-15 10:00:00",
  "motivo": "Consulta general"
}
```

### 4. **Actualizar Cita**
```
PUT /api/Pcitas/{id}
```
**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "estado": "CONFIRMADA",
  "motivo": "Consulta actualizada"
}
```

### 5. **Eliminar Cita**
```
DELETE /api/Pcitas/{id}
```
**Headers requeridos:**
```
Authorization: Bearer {token}
```

### 6. **Actualizar Perfil del Paciente**
```
PUT /api/Ppacientes/{id}
```
**Headers requeridos:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "telefono": "3228664513",
  "fecha_nacimiento": "2000-05-08"
}
```

## 🎯 Endpoints Adicionales Disponibles

### 7. **Obtener Información del Usuario Actual**
```
GET /api/me
```

### 8. **Obtener Médicos (Admin)**
```
GET /api/medicos
```

### 9. **Obtener Pacientes (Admin)**
```
GET /api/pacientes
```

### 10. **Obtener Citas (Admin)**
```
GET /api/Acitas
```

## 🔍 Estructura de la Base de Datos

Basándome en tu SQL dump, las tablas principales son:

- **users**: Información básica del usuario
- **pacientes**: Información específica del paciente (teléfono, fecha_nacimiento)
- **medicos**: Información específica del médico (especialidad)
- **citas**: Citas médicas con relaciones a médico y paciente
- **horarios**: Horarios de disponibilidad de los médicos

## 🚀 Estado Actual

✅ **¡Todos los endpoints necesarios ya están implementados!**

Tu backend Laravel ya tiene:
- ✅ Autenticación con Sanctum
- ✅ Middleware de roles (ADMIN, MEDICO, PACIENTE)
- ✅ Endpoints específicos para cada rol
- ✅ CRUD completo para citas de pacientes
- ✅ Gestión de perfiles de pacientes

## ⚠️ Notas Importantes

1. **Autenticación**: Todos los endpoints requieren Bearer token válido
2. **Roles**: Los endpoints están protegidos por middleware de roles
3. **Relaciones**: Asegúrate de que los controladores carguen las relaciones necesarias
4. **Fechas**: Las fechas deben devolverse en formato ISO 8601
5. **Errores**: Los endpoints devuelven errores HTTP apropiados

## 🧪 Testing

Puedes probar los endpoints con:
- **Postman**
- **Insomnia** 
- **cURL**
- **El dashboard de la app (ya configurado)**

## 🎯 Próximos Pasos

1. **Probar el dashboard** - Ya está configurado para usar tus endpoints
2. **Verificar respuestas** - Asegúrate de que los controladores devuelvan las relaciones
3. **Optimizar consultas** - Usa `with()` para cargar relaciones y evitar N+1 queries

---

**¡El dashboard del paciente ya está listo para funcionar con tu backend! 🚀**
