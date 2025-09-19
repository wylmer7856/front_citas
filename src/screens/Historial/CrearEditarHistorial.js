import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createHistorial, updateHistorial, getHistorial } from "../../api/historialService";

export default function CrearEditarHistorial({ route, navigation }) {
  const { id } = route.params || {};
  const [paciente, setPaciente] = useState("");
  const [fecha, setFecha] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [tratamiento, setTratamiento] = useState("");

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await getHistorial(id);
          setPaciente(data.paciente);
          setFecha(data.fecha);
          setDiagnostico(data.diagnostico);
          setTratamiento(data.tratamiento);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (id) {
        await updateHistorial(id, { paciente, fecha, diagnostico, tratamiento });
        Alert.alert("✅ Éxito", "Historial actualizado correctamente");
      } else {
        await createHistorial({ paciente, fecha, diagnostico, tratamiento });
        Alert.alert("✅ Éxito", "Historial creado correctamente");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("❌ Error", "No se pudo guardar el historial");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{id ? "Editar Historial" : "Nuevo Historial"}</Text>

      <TextInput style={styles.input} placeholder="Paciente" value={paciente} onChangeText={setPaciente} />
      <TextInput style={styles.input} placeholder="Fecha" value={fecha} onChangeText={setFecha} />
      <TextInput style={styles.input} placeholder="Diagnóstico" value={diagnostico} onChangeText={setDiagnostico} />
      <TextInput style={styles.input} placeholder="Tratamiento" value={tratamiento} onChangeText={setTratamiento} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{id ? "Actualizar" : "Crear"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F9FD" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#1089D3" },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: { backgroundColor: "#1089D3", padding: 15, borderRadius: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
