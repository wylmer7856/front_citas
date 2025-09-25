// src/services/StorageService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const StorageService = {
  async setItem(key, value) {
    try {
      // ✅ VALIDAR: No permitir null o undefined
      if (value === null || value === undefined) {
        console.warn(`⚠️ Intento de guardar valor null/undefined para clave "${key}". Usando removeItem en su lugar.`);
        await this.removeItem(key);
        return;
      }

      // ✅ VALIDAR: El valor debe ser string
      if (typeof value !== 'string') {
        console.warn(`⚠️ El valor para "${key}" no es string. Convirtiendo...`);
        value = JSON.stringify(value);
      }

      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error("❌ Error al guardar en storage:", e);
    }
  },

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      console.error("❌ Error al obtener de storage:", e);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("❌ Error al eliminar de storage:", e);
    }
  },

  // ✅ NUEVO: Método helper para objetos JSON
  async setJsonItem(key, object) {
    try {
      if (object === null || object === undefined) {
        await this.removeItem(key);
        return;
      }
      const jsonString = JSON.stringify(object);
      await this.setItem(key, jsonString);
    } catch (e) {
      console.error("❌ Error al guardar JSON en storage:", e);
    }
  },

  // ✅ NUEVO: Método helper para obtener objetos JSON
  async getJsonItem(key) {
    try {
      const jsonString = await this.getItem(key);
      if (!jsonString || jsonString === "undefined" || jsonString === "null") {
        return null;
      }
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("❌ Error al parsear JSON de storage:", e);
      return null;
    }
  }
};

export default StorageService;