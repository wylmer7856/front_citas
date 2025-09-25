// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import StorageService from "../services/StorageService";

// ==========================================
// IMPORTAR AuthService - TESTING DIFFERENT WAYS
// ==========================================

// Opción A: Import todo
import * as AuthService from "../services/AuthService";

// Opción B: Import default (comentado para testing)
// import AuthService from "../services/AuthService";

// Opción C: Import específico (comentado para testing)  
// import { login, register, logout } from "../services/AuthService";

console.log("🔍 AuthService importado:", AuthService);
console.log("🔍 AuthService.login:", AuthService.login);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log("🔄 Cargando usuario del storage...");
        const storedUser = await StorageService.getJsonItem("user");
        
        if (storedUser) {
          console.log("✅ Usuario cargado desde storage:", storedUser);
          setUser(storedUser);
        } else {
          console.log("ℹ️ No hay usuario en storage");
          setUser(null);
        }
      } catch (error) {
        console.error("❌ Error al cargar usuario del storage:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    console.log("🟦 [CTX-1] AuthContext.login INICIADO");
    console.log("🟦 [CTX-2] Parámetros:", { email, password });
    
    try {
      console.log("🟦 [CTX-3] Entrando al try...");
      
      // Validar parámetros
      console.log("🟦 [CTX-4] Validando parámetros...");
      if (!email || !password) {
        console.error("🟦 [CTX-4-ERROR] Parámetros faltantes");
        throw new Error("Email y contraseña son requeridos");
      }
      console.log("🟦 [CTX-5] Parámetros OK ✅");

      // Verificar que AuthService.login existe
      console.log("🟦 [CTX-6] Verificando AuthService.login...");
      console.log("🟦 [CTX-6a] AuthService:", AuthService);
      console.log("🟦 [CTX-6b] AuthService.login:", AuthService.login);
      console.log("🟦 [CTX-6c] Tipo:", typeof AuthService.login);
      
      if (typeof AuthService.login !== 'function') {
        console.error("❌ AuthService.login no es una función:", AuthService.login);
        throw new Error("AuthService.login no disponible");
      }
      console.log("🟦 [CTX-7] AuthService.login OK ✅");

      console.log("🟦 [CTX-8] LLAMANDO AuthService.login...");
      console.log("🟦 [CTX-8a] Con parámetros:", { email, password });
      
      const loggedUser = await AuthService.login(email, password);
      
      console.log("🟦 [CTX-9] RESPUESTA RECIBIDA:");
      console.log("🟦 [CTX-9a] Valor:", loggedUser);
      console.log("🟦 [CTX-9b] Tipo:", typeof loggedUser);
      console.log("🟦 [CTX-9c] Es null:", loggedUser === null);
      console.log("🟦 [CTX-9d] Es undefined:", loggedUser === undefined);
      
      if (loggedUser && loggedUser.id) {
        console.log("🟦 [CTX-10] Usuario válido - procesando...");
        console.log("🟦 [CTX-10a] ID encontrado:", loggedUser.id);
        
        await StorageService.setJsonItem("user", loggedUser);
        console.log("🟦 [CTX-11] Usuario guardado en storage");
        
        // Guardar token por separado si existe
        if (loggedUser.token) {
          await StorageService.setItem("token", loggedUser.token);
          console.log("🟦 [CTX-12] Token guardado:", loggedUser.token);
        }
        
        setUser(loggedUser);
        console.log("🟦 [CTX-13] Estado actualizado");
        console.log("🟦 [CTX-14] ✅ LOGIN EXITOSO");
        return { success: true, user: loggedUser };
        
      } else {
        console.log("🟦 [CTX-15] ❌ Usuario inválido o null");
        console.log("🟦 [CTX-15a] loggedUser:", loggedUser);
        console.log("🟦 [CTX-15b] loggedUser?.id:", loggedUser?.id);
        return { success: false, error: "Credenciales inválidas" };
      }
      
    } catch (error) {
      console.error("🟦 [CTX-ERROR] Error capturado:", error);
      console.error("🟦 [CTX-ERROR] Mensaje:", error.message);
      console.error("🟦 [CTX-ERROR] Stack:", error.stack);
      return { success: false, error: error.message || "Error de conexión" };
    }
  };

  const register = async (payload) => {
    console.log("🔄 AuthContext: Iniciando registro...");
    
    try {
      if (!payload) {
        throw new Error("Datos de registro no válidos");
      }

      const newUser = await AuthService.register(payload);
      console.log("🔍 Resultado de registro:", newUser);

      if (newUser && newUser.id) {
        console.log("✅ Registro exitoso:", newUser);
        await StorageService.setJsonItem("user", newUser);
        
        if (newUser.token) {
          await StorageService.setItem("token", newUser.token);
        }
        
        setUser(newUser);
        return { success: true, user: newUser };
      } else {
        return { success: false, error: "Error al crear usuario" };
      }
    } catch (error) {
      console.error("❌ Error en registro:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    console.log("🔄 AuthContext: Iniciando logout...");
    
    try {
      await AuthService.logout();
      await StorageService.removeItem("user");
      await StorageService.removeItem("token");
      setUser(null);
      console.log("✅ Logout exitoso");
    } catch (error) {
      console.error("❌ Error en logout:", error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.rol || null,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};