import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("PACIENTE"); // por defecto PACIENTE

  const handleSubmit = async () => {
    if (!nombre || !apellido || !email || !password) {
      Alert.alert("Error", "Todos los campos requeridos deben ser llenados.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          telefono,
          password,
          rol,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", data.message);
        navigation.navigate("LoginScreen");
      } else {
        Alert.alert("Error", data.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Teléfono (opcional)"
        value={telefono}
        onChangeText={setTelefono}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <Button title="Registrarse" onPress={handleSubmit} />
    </View>
  );
}
