// src/screens/medico/MedicoScreen.js
import React from "react";
import { ScrollView, Text, View, Button, Alert } from "react-native";
import DashboardCard from "../../components/cards/DashboardCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function MedicoScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user"); // elimina la info del usuario
      // Redirige al login
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión.");
      console.log("Error al hacer logout:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Dashboard Médico
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        <DashboardCard title="Mis Citas" value={20} icon="📅" />
        <DashboardCard title="Historiales Atendidos" value={50} icon="📑" />
        <DashboardCard title="Especialidades" value={3} icon="📚" />
      </View>

      {/* Botón de Logout */}
      <View style={{ marginTop: 30 }}>
        <Button title="Cerrar Sesión" color="red" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}
