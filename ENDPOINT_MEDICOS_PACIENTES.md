# 🔧 Endpoint Necesario para Médicos

## ❌ Problema Actual

El endpoint `/api/medicos` está protegido con middleware `role:ADMIN`, por lo que los pacientes no pueden acceder a él (Error 403).

## ✅ Solución Recomendada

Necesitas agregar un endpoint público o específico para pacientes que les permita ver los médicos disponibles.

### Opción 1: Endpoint Público (Recomendado)

Agrega esta ruta en tu `routes/api.php`:

```php
// Ruta pública para que los pacientes vean médicos disponibles
Route::get('/medicos-disponibles', [MedicoController::class, 'getMedicosDisponibles']);
```

Y este método en tu `MedicoController`:

```php
public function getMedicosDisponibles()
{
    $medicos = Medico::with('user')->get();
    
    return response()->json($medicos);
}
```

### Opción 2: Endpoint para Pacientes

Agrega esta ruta en la sección de pacientes:

```php
// Dentro del middleware 'role:PACIENTE'
Route::get('/medicos', [MedicoController::class, 'getMedicosDisponibles']);
```

### Opción 3: Usar el Endpoint Existente

Modifica el middleware para permitir que los pacientes también accedan:

```php
// Cambiar de:
Route::middleware('role:ADMIN')->group(function () {
    Route::get('/medicos', [MedicoController::class, 'index']);
});

// A:
Route::middleware('role:ADMIN,PACIENTE')->group(function () {
    Route::get('/medicos', [MedicoController::class, 'index']);
});
```

## 🚀 Implementación Temporal

Mientras implementas el endpoint, la app usará datos de ejemplo basados en tu base de datos:

- **Dr. camila** - Cardiología
- **Juan Barrera** - Psicología

## 📋 Estructura de Respuesta Esperada

```json
[
  {
    "id": 1,
    "especialidad": "Cardiología",
    "user": {
      "id": 3,
      "name": "dr camila",
      "email": "cami@mail.com"
    }
  },
  {
    "id": 2,
    "especialidad": "Psicología", 
    "user": {
      "id": 5,
      "name": "Juan Barrera",
      "email": "juan@gmail.com"
    }
  }
]
```

## 🎯 Próximos Pasos

1. **Implementa uno de los endpoints** mencionados arriba
2. **Actualiza la app** para usar el nuevo endpoint
3. **Prueba la funcionalidad** de agendar citas

---

**¿Cuál opción prefieres implementar?**








