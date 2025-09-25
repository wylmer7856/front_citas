// src/services/AuthService.js
// CONECTADO A API REAL

console.log("🟢 [INICIO] AuthService cargando...");

// ==========================================
// CONFIGURACIÓN DE API
// ==========================================
const API_URL = "http://127.0.0.1:8000/api";

console.log("🌐 API_URL configurada:", API_URL);

// ==========================================
// LOGIN FUNCTION - API REAL
// ==========================================
const login = async (email, password) => {
  console.log("🔴 [API-LOGIN-1] login() INICIADO");
  console.log("🔴 [API-LOGIN-2] Parámetros recibidos:", { email, password });
  
  try {
    console.log("🔴 [API-LOGIN-3] Validando parámetros...");
    
    if (!email || !password) {
      throw new Error("Email y password son requeridos");
    }
    
    console.log("🔴 [API-LOGIN-4] Preparando petición a API...");
    
    const requestBody = {
      email: email.trim(),
      password: password
    };
    
    console.log("🔴 [API-LOGIN-5] Body de la petición:", requestBody);
    console.log("🔴 [API-LOGIN-6] URL:", `${API_URL}/login`);
    
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("🔴 [API-LOGIN-7] Respuesta recibida - Status:", response.status);
    console.log("🔴 [API-LOGIN-8] Headers:", response.headers);

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorText = await response.text();
      console.error("🔴 [API-LOGIN-ERROR] Respuesta no exitosa:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { message: errorText || "Error de autenticación" };
      }
      
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    console.log("🔴 [API-LOGIN-9] Parsing respuesta JSON...");
    const data = await response.json();
    console.log("🔴 [API-LOGIN-10] Datos recibidos del servidor:", data);

    // Validar la estructura de la respuesta
    if (!data) {
      console.error("🔴 [API-LOGIN-ERROR] Respuesta vacía del servidor");
      throw new Error("Respuesta inválida del servidor");
    }

    // Adaptar la respuesta según la estructura de tu API
    // Ajusta estos campos según tu respuesta real
    let userData;
    
    if (data.user) {
      // Si la API devuelve { user: {...}, token: "..." }
      userData = {
        id: data.user.id,
        email: data.user.email,
        nombre: data.user.nombre || data.user.name,
        apellido: data.user.apellido,
        telefono: data.user.telefono,
        rol: data.user.rol || data.user.role,
        token: data.token || data.access_token,
        ...data.user // Incluir otros campos
      };
    } else if (data.usuario) {
      // Si la API devuelve { usuario: {...}, token: "..." }
      userData = {
        id: data.usuario.id,
        email: data.usuario.email,
        nombre: data.usuario.nombre || data.usuario.name,
        apellido: data.usuario.apellido,
        telefono: data.usuario.telefono,
        rol: data.usuario.rol || data.usuario.role,
        token: data.token || data.access_token,
        ...data.usuario
      };
    } else {
      // Si la API devuelve directamente los datos del usuario
      userData = {
        id: data.id,
        email: data.email,
        nombre: data.nombre || data.name,
        apellido: data.apellido,
        telefono: data.telefono,
        rol: data.rol || data.role,
        token: data.token || data.access_token,
        ...data
      };
    }

    console.log("🔴 [API-LOGIN-11] Usuario estructurado:", userData);

    // Validar que tenemos los datos mínimos necesarios
    if (!userData.id || !userData.email) {
      console.error("🔴 [API-LOGIN-ERROR] Datos de usuario incompletos:", userData);
      throw new Error("Datos de usuario incompletos recibidos del servidor");
    }

    console.log("🔴 [API-LOGIN-12] ✅ LOGIN EXITOSO - Retornando usuario");
    return userData;

  } catch (error) {
    console.error("🔴 [API-LOGIN-ERROR] Error capturado:", error);
    console.error("🔴 [API-LOGIN-ERROR] Mensaje:", error.message);
    console.error("🔴 [API-LOGIN-ERROR] Stack:", error.stack);
    
    // Re-lanzar el error para que AuthContext lo maneje
    throw error;
  }
};

// ==========================================
// REGISTER FUNCTION - API REAL
// ==========================================
const register = async (userData) => {
  console.log("🟡 [API-REG-1] register() INICIADO");
  console.log("🟡 [API-REG-2] userData:", userData);
  
  try {
    if (!userData || !userData.email || !userData.password) {
      throw new Error("Datos de registro incompletos");
    }

    console.log("🟡 [API-REG-3] Preparando petición de registro...");

    const requestBody = {
      nombre: userData.nombre,
      apellido: userData.apellido,
      email: userData.email.trim(),
      telefono: userData.telefono,
      password: userData.password,
      password_confirmation: userData.password_confirmation || userData.password,
      rol: userData.rol || "PACIENTE"
    };

    console.log("🟡 [API-REG-4] Body de la petición:", { ...requestBody, password: "[OCULTO]" });

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("🟡 [API-REG-5] Respuesta - Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("🟡 [API-REG-ERROR] Error del servidor:", errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { message: errorText || "Error en el registro" };
      }
      
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("🟡 [API-REG-6] Datos recibidos:", data);

    // Estructurar respuesta similar al login
    let newUserData;
    
    if (data.user || data.usuario) {
      const userObj = data.user || data.usuario;
      newUserData = {
        id: userObj.id,
        email: userObj.email,
        nombre: userObj.nombre || userObj.name,
        apellido: userObj.apellido,
        telefono: userObj.telefono,
        rol: userObj.rol || userObj.role,
        token: data.token || data.access_token,
        ...userObj
      };
    } else {
      newUserData = {
        id: data.id,
        email: data.email,
        nombre: data.nombre || data.name,
        apellido: data.apellido,
        telefono: data.telefono,
        rol: data.rol || data.role,
        token: data.token || data.access_token,
        ...data
      };
    }

    console.log("🟡 [API-REG-7] ✅ REGISTRO EXITOSO:", newUserData);
    return newUserData;

  } catch (error) {
    console.error("🟡 [API-REG-ERROR]:", error);
    throw error;
  }
};

// ==========================================
// LOGOUT FUNCTION - API REAL
// ==========================================
const logout = async () => {
  console.log("🔵 [API-LOGOUT-1] logout() INICIADO");
  
  try {
    // Intentar logout en el servidor (opcional)
    // Si tienes token, enviarlo en headers
    const token = await getStoredToken(); // Función helper para obtener token
    
    if (token) {
      console.log("🔵 [API-LOGOUT-2] Enviando logout al servidor...");
      
      try {
        const response = await fetch(`${API_URL}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          console.log("🔵 [API-LOGOUT-3] ✅ Logout exitoso en servidor");
        } else {
          console.log("🔵 [API-LOGOUT-3] ⚠️ Logout falló en servidor, pero continuando...");
        }
      } catch (serverError) {
        console.log("🔵 [API-LOGOUT-3] ⚠️ Error en servidor durante logout:", serverError.message);
        // Continuar con logout local aunque falle el servidor
      }
    }

    console.log("🔵 [API-LOGOUT-4] ✅ Logout completado");
    return true;

  } catch (error) {
    console.error("🔵 [API-LOGOUT-ERROR]:", error);
    // Aún así retornar true para limpiar localmente
    return true;
  }
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================
const getStoredToken = async () => {
  try {
    // Importar dinámicamente para evitar ciclos
    const { default: StorageService } = await import('./StorageService');
    return await StorageService.getItem('token');
  } catch (error) {
    console.error("Error obteniendo token:", error);
    return null;
  }
};

console.log("🟢 [EXPORT] Exportando funciones:");
console.log("🟢 [EXPORT] login:", typeof login);
console.log("🟢 [EXPORT] register:", typeof register);
console.log("🟢 [EXPORT] logout:", typeof logout);

// ==========================================
// EXPORTS
// ==========================================
export { login, register, logout };

const AuthService = {
  login,
  register,
  logout
};

export default AuthService;

console.log("✅ AuthService API real configurado");