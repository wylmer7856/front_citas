// src/screens/shared/ProfileScreen.js
import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Mi Perfil</Text>
      <Text style={{ marginTop: 10 }}>👤 Nombre: {user?.name}</Text>
      <Text>📧 Email: {user?.email}</Text>
      <Text>🛡 Rol: {user?.role}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Editar Perfil" onPress={() => navigation.navigate("Settings")} />
        <Button title="Cerrar Sesión" color="red" onPress={logout} />
      </View>
    </View>
  );
}
