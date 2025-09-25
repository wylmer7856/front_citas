import React from "react";
import { View, Text } from "react-native";

export default function DetalleEspecialidadScreen({ route }) {
  const { esp } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{esp.nombre}</Text>
      <Text>Descripción: {esp.descripcion}</Text>
    </View>
  );
}
