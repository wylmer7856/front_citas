import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../../api/authService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (!email || !password) {
      Alert.alert("Error", "Correo y contraseña son obligatorios");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Correo electrónico inválido");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true);
      const response = await login(email, password);

      // Validar estructura esperada del backend
      if (!response.access_token || !response.usuario?.rol) {
        throw new Error("Respuesta inválida del servidor");
      }

      // Guardar token y rol
      await AsyncStorage.setItem("token", response.access_token);
      await AsyncStorage.setItem("rol", response.usuario.rol);

      Alert.alert("✅ Bienvenido", `Has ingresado como ${response.usuario.rol}`);

      // Navegación según rol
      switch (response.usuario.rol) {
        case "ADMIN":
          navigation.replace("Admin");
          break;
        case "MEDICO":
          navigation.replace("Medico");
          break;
        case "PACIENTE":
        default:
          navigation.replace("Paciente");
          break;
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Credenciales inválidas";
      Alert.alert("❌ Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "Cargando..." : "Ingresar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerLink}>
          ¿No tienes cuenta?{" "}
          <Text style={{ color: "#0099ff" }}>Crear cuenta</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#F8F9FD",
  },
  heading: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 28,
    color: "#1089D3",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  loginButton: {
    backgroundColor: "#1089D3",
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerLink: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 10,
    color: "#444",
  },
});
