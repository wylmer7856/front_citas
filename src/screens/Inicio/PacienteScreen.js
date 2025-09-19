import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PacienteScreen({ navigation }) {
  const opciones = [
    { label: "Mis Citas", screen: "ListarCitasPaciente" },
    { label: "Historial Médico", screen: "VerHistorialPaciente" },
    { label: "Especialidades", screen: "ListarEspecialidades" },
  ];

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("rol");
    navigation.replace("Auth");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bienvenido, Paciente</Text>
      {opciones.map((opcion, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => navigation.navigate(opcion.screen)}
        >
          <Text style={styles.cardText}>{opcion.label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F9FD" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#1089D3" },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardText: { fontSize: 18, color: "#333", fontWeight: "600" },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
