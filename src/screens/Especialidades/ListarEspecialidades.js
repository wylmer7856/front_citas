import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getEspecialidades, deleteEspecialidad } from "../../api/especialidadesService";

export default function ListarEspecialidades() {
  const navigation = useNavigation();
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getEspecialidades();
      setEspecialidades(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las especialidades");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEspecialidad(id);
      fetchData();
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar la especialidad");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1089D3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Especialidades</Text>
      <FlatList
        data={especialidades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetalleEspecialidad", { id: item.id, registro: item })}
          >
            <Text style={styles.name}>{item.nombre}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.delete}>Eliminar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CrearEditarEspecialidad")}
      >
        <Text style={styles.addText}>+ Nueva Especialidad</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: "600" },
  delete: { color: "red", fontWeight: "bold" },
  addButton: {
    marginTop: 20,
    backgroundColor: "#1089D3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  addText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
