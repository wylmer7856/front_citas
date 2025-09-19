import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { getHistoriales } from "../../api/historialService";

export default function ListarHistorial({ navigation }) {
  const [historiales, setHistoriales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistoriales();
        setHistoriales(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Historial de Pacientes</Text>

      <FlatList
        data={historiales}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetalleHistorial", { id: item.id })}
          >
            <Text style={styles.title}>Paciente: {item.paciente}</Text>
            <Text style={styles.subtitle}>Fecha: {item.fecha}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CrearEditarHistorial")}
      >
        <Text style={styles.addButtonText}>+ Nuevo Historial</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F9FD" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#1089D3" },
  card: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#555" },
  addButton: {
    backgroundColor: "#1089D3",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
});
