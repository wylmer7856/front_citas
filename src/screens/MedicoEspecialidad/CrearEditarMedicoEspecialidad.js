import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  createMedicoEspecialidad,
  updateMedicoEspecialidad,
} from "../../api/medicoEspecialidadService";

export default function Crear_EditarM_E() {
  const route = useRoute();
  const navigation = useNavigation();

  // Si viene un registro por params → es edición
  const registro = route.params?.registro || null;

  const [medicoId, setMedicoId] = useState(registro ? registro.medico_id.toString() : "");
  const [especialidadId, setEspecialidadId] = useState(
    registro ? registro.especialidad_id.toString() : ""
  );

  const handleSubmit = async () => {
    if (!medicoId || !especialidadId) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      if (registro) {
        // Actualizar
        await updateMedicoEspecialidad(registro.id, {
          medico_id: medicoId,
          especialidad_id: especialidadId,
        });
        Alert.alert("✅ Éxito", "Relación actualizada correctamente");
      } else {
        // Crear
        await createMedicoEspecialidad({
          medico_id: medicoId,
          especialidad_id: especialidadId,
        });
        Alert.alert("✅ Éxito", "Relación creada correctamente");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("❌ Error", "No se pudo guardar la relación");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {registro ? "Editar Relación" : "Crear Relación"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="ID del Médico"
        value={medicoId}
        onChangeText={setMedicoId}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="ID de la Especialidad"
        value={especialidadId}
        onChangeText={setEspecialidadId}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.btnGuardar} onPress={handleSubmit}>
        <Text style={styles.btnText}>
          {registro ? "Actualizar" : "Crear"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnCancelar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  btnGuardar: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  btnCancelar: {
    backgroundColor: "#6c757d",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
