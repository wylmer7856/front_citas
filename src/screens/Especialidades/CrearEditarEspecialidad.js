import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { createEspecialidad, updateEspecialidad } from "../../api/especialidadesService";

export default function CrearEditarEspecialidad() {
  const route = useRoute();
  const navigation = useNavigation();
  const { registro } = route.params || {};

  const [nombre, setNombre] = useState(registro?.nombre || "");
  const [descripcion, setDescripcion] = useState(registro?.descripcion || "");

  const handleSave = async () => {
    try {
      if (registro) {
        await updateEspecialidad(registro.id, { nombre, descripcion });
        Alert.alert("Éxito", "Especialidad actualizada");
      } else {
        await createEspecialidad({ nombre, descripcion });
        Alert.alert("Éxito", "Especialidad creada");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la especialidad");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{registro ? "Editar Especialidad" : "Nueva Especialidad"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#1089D3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
