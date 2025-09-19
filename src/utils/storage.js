import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "authToken";
const ROLE_KEY = "userRole";

// Guardar token
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error guardando token:", error);
  }
};

// Obtener token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error obteniendo token:", error);
    return null;
  }
};

// Eliminar token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error eliminando token:", error);
  }
};

// Guardar rol
export const saveRole = async (role) => {
  try {
    await AsyncStorage.setItem(ROLE_KEY, role);
  } catch (error) {
    console.error("Error guardando rol:", error);
  }
};

// Obtener rol
export const getRole = async () => {
  try {
    return await AsyncStorage.getItem(ROLE_KEY);
  } catch (error) {
    console.error("Error obteniendo rol:", error);
    return null;
  }
};

// Limpiar todo (logout)
export const clearStorage = async () => {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, ROLE_KEY]);
  } catch (error) {
    console.error("Error limpiando storage:", error);
  }
};
