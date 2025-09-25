import React, { useContext } from "react";
import { ScrollView, Text, View, Button } from "react-native";
import DashboardCard from "../../components/cards/DashboardCard";
import { AuthContext } from "../../context/AuthContext";

export default function AdminScreen() {
  const { logout } = useContext(AuthContext); // 🔹 Usar logout del contexto

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Dashboard Administrador
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        <DashboardCard title="Usuarios" value={120} icon="👥" />
        <DashboardCard title="Médicos" value={35} icon="👨‍⚕️" />
        <DashboardCard title="Pacientes" value={85} icon="🧑" />
        <DashboardCard title="Especialidades" value={12} icon="📚" />
      </View>

      <View style={{ marginTop: 30 }}>
        <Button title="Cerrar Sesión" color="red" onPress={logout} />
      </View>
    </ScrollView>
  );
}
