// src/screens/admin/usuarios/DetalleUsuarioScreen.js
import React from "react";
import { View, Text } from "react-native";

export default function DetalleUsuarioScreen({ route }) {
  const { usuario } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {usuario.nombre}
      </Text>
      <Text>Email: {usuario.email}</Text>
      <Text>Rol: {usuario.rol}</Text>
    </View>
  );
}
