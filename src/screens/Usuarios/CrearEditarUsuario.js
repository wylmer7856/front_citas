import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { createUsuario, updateUsuario } from "../../api/usuariosService";

export default function CrearEditarUsuario({ route, navigation }) {
  const usuario = route.params?.usuario || null;

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rol, setRol] = useState("user");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setEmail(usuario.email);
      setTelefono(usuario.telefono);
      setRol(usuario.rol);
      // password no se carga por seguridad
    }
  }, [usuario]);

  const handleGuardar = async () => {
    if (!nombre || !apellido || !email || !telefono || (!usuario && !password)) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      if (usuario) {
        await updateUsuario(usuario.id, {
          nombre,
          apellido,
          email,
          telefono,
          rol,
        });
        Alert.alert("✅ Éxito", "Usuario actualizado correctamente");
      } else {
        await createUsuario({
          nombre,
          apellido,
          email,
          telefono,
          rol,
          password,
        });
        Alert.alert("✅ Éxito", "Usuario creado correctamente");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("❌ Error", "No se pudo guardar el usuario");
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        {usuario ? "Editar Usuario" : "Crear Usuario"}
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />
        <TextInput
          style={styles.input}
          placeholder="Rol (admin o user)"
          value={rol}
          onChangeText={setRol}
        />
        {!usuario && (
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        )}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
        <Text style={styles.saveButtonText}>
          {usuario ? "Actualizar" : "Crear"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8F9FD",
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "#1089D3",
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: "#1089D3",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
