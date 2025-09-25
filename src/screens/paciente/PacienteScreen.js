// src/screens/paciente/DashboardPaciente.js
import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function DashboardPaciente({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Paciente</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("MisCitas")}
        >
          <Text style={styles.cardTitle}>📅 Mis Citas</Text>
          <Text style={styles.cardValue}>5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Historial")}
        >
          <Text style={styles.cardTitle}>📄 Mi Historial</Text>
          <Text style={styles.cardValue}>12</Text>
        </TouchableOpacity>
      </View>

      {/* 🔴 Botón Logout */}
      <View style={{ marginTop: 30 }}>
        <Button title="Cerrar Sesión" color="red" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  cardContainer: { flexDirection: "row", gap: 15 },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 3,
  },
  cardTitle: { fontSize: 16, marginBottom: 5 },
  cardValue: { fontSize: 18, fontWeight: "bold" },
});
