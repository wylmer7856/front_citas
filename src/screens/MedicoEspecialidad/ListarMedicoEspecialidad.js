import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getMedicosEspecialidades,
  deleteMedicoEspecialidad,
} from "../../api/medicoEspecialidadService";

export default function ListarM_E() {
  const [registros, setRegistros] = useState([]);
  const navigation = useNavigation();

  // Cargar datos desde API
  const fetchData = async () => {
    try {
      const data = await getMedicosEspecialidades();
      setRegistros(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las relaciones médico-especialidad");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Eliminar con confirmación
  const handleDelete = (id) => {
    Alert.alert("Confirmar", "¿Deseas eliminar esta relación?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteMedicoEspecialidad(id);
            fetchData(); // refrescar lista
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar la relación");
          }
        },
      },
    ]);
  };

  // Render de cada ítem
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>👨‍⚕️ Médico: {item.medico?.nombre}</Text>
      <Text style={styles.text}>📌 Especialidad: {item.especialidad?.nombre}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.btnEditar}
          onPress={() => navigation.navigate("Crear_EditarM_E", { registro: item })}
        >
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnEliminar}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.btnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relaciones Médico - Especialidad</Text>

      <TouchableOpacity
        style={styles.btnCrear}
        onPress={() => navigation.navigate("Crear_EditarM_E")}
      >
        <Text style={styles.btnText}>➕ Crear Nueva Relación</Text>
      </TouchableOpacity>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: { fontSize: 16, marginBottom: 4 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  btnEditar: { backgroundColor: "#007bff", padding: 8, borderRadius: 6 },
  btnEliminar: { backgroundColor: "#dc3545", padding: 8, borderRadius: 6 },
  btnCrear: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
