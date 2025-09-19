import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getEspecialidadById } from "../../api/especialidadesService";

export default function DetalleEspecialidad() {
  const route = useRoute();
  const { id, registro } = route.params || {};
  const [detalle, setDetalle] = useState(registro || null);
  const [loading, setLoading] = useState(!registro);

  const fetchDetalle = async () => {
    try {
      const data = await getEspecialidadById(id);
      setDetalle(data);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar la especialidad");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!registro && id) {
      fetchDetalle();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1089D3" />
      </View>
    );
  }

  if (!detalle) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>No se encontró la especialidad</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de Especialidad</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{detalle.nombre}</Text>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{detalle.descripcion || "Sin descripción"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  label: { fontWeight: "bold", marginTop: 12, fontSize: 16 },
  value: { fontSize: 16, color: "#333", marginTop: 4 },
  error: { fontSize: 16, color: "red" },
});
