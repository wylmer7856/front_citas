import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getHistorial } from "../../api/historialService";

export default function DetalleHistorial({ route }) {
  const { id } = route.params;
  const [historial, setHistorial] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistorial(id);
        setHistorial(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (!historial) return <Text style={styles.loading}>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de {historial.paciente}</Text>
      <Text>Fecha: {historial.fecha}</Text>
      <Text>Diagnóstico: {historial.diagnostico}</Text>
      <Text>Tratamiento: {historial.tratamiento}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "#1089D3" },
  loading: { flex: 1, textAlign: "center", marginTop: 50, fontSize: 18 },
});
