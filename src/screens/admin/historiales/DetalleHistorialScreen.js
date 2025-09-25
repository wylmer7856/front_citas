import React from "react";
import { View, Text } from "react-native";
import HistorialCard from "../../../components/cards/HistorialCard";

export default function DetalleHistorialScreen({ route }) {
  const { historial } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <HistorialCard historial={historial} />
    </View>
  );
}
