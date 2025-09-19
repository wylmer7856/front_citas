import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getMedicoEspecialidadById } from "../../api/medicoEspecialidadService";

export default function DetalleM_E() {
  const route = useRoute();
  const { id, registro } = route.params || {}; 
  // 👆 si llega `registro` desde la lista se muestra, si solo llega `id` → pedimos a la API

  const [detalle, setDetalle] = useState(registro || null);
  const [loading, setLoading] = useState(!registro);

  const fetchDetalle = async () => {
    if (!id) return;
    try {
      const data = await getMedicoEspecialidadById(id);
      setDetalle(data);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el detalle");
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
        <Text style={styles.error}>No se encontró información</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle Relación</Text>

      <View style={styles.card}>
        <Text style={styles.label}>👨‍⚕️ Médico:</Text>
        <Text style={styles.value}>
          {detalle.medico?.nombre || `ID: ${detalle.medico_id}`}
        </Text>

        <Text style={styles.label}>📌 Especialidad:</Text>
        <Text style={styles.value}>
          {detalle.especialidad?.nombre || `ID: ${detalle.especialidad_id}`}
        </Text>

        <Text style={styles.label}>🆔 ID Relación:</Text>
        <Text style={styles.value}>{detalle.id}</Text>
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: { fontWeight: "bold", marginTop: 12, fontSize: 16 },
  value: { fontSize: 16, color: "#333", marginTop: 4 },
  error: { fontSize: 16, color: "red" },
});
