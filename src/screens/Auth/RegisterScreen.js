import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { register } from "../../api/authService";

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("PACIENTE");
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (!nombre || !apellido || !email || !telefono || !password || !rol) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Correo electrónico inválido");
      return false;
    }

    const phoneRegex = /^\d{7,15}$/;
    if (!phoneRegex.test(telefono)) {
      Alert.alert("Error", "El teléfono debe tener entre 7 y 15 dígitos");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true);
      await register({ nombre, apellido, email, telefono, password, rol });

      Alert.alert("✅ Éxito", "Usuario registrado correctamente");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("❌ Error", error.response?.data?.message || "No se pudo registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Crear Cuenta</Text>

      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
      <TextInput style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Teléfono" keyboardType="phone-pad" value={telefono} onChangeText={setTelefono} />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />

      <Text style={styles.label}>Rol</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={rol}
          onValueChange={(itemValue) => setRol(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Paciente" value="PACIENTE" />
          <Picker.Item label="Médico" value="MEDICO" />
          <Picker.Item label="Administrador" value="ADMIN" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
        <Text style={styles.registerButtonText}>{loading ? "Cargando..." : "Registrar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>
          ¿Ya tienes cuenta? <Text style={{ color: "#0099ff" }}>Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 25, backgroundColor: "#F8F9FD" },
  heading: { textAlign: "center", fontWeight: "900", fontSize: 28, color: "#1089D3", marginBottom: 20 },
  input: {
    width: "100%", backgroundColor: "#fff", padding: 15, borderRadius: 20, marginTop: 15,
    borderWidth: 1, borderColor: "#ccc"
  },
  label: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#333",
    fontSize: 14,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  registerButton: { backgroundColor: "#1089D3", padding: 15, borderRadius: 20, marginTop: 20, alignItems: "center" },
  registerButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  loginLink: { textAlign: "center", fontSize: 12, marginTop: 15, color: "#444" },
});
