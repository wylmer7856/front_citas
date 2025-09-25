// src/components/cards/HistorialCard.js
import React from "react";
import { Text, View } from "react-native";
import Card from "../common/Card";

export default function HistorialCard({ historial }) {
  if (!historial) return null;

  return (
    <Card>
      <View>
        <Text>🧑 Paciente: {historial.paciente?.nombre}</Text>
        <Text>👨‍⚕️ Médico: {historial.medico?.nombre}</Text>
        <Text>📄 {historial.descripcion}</Text>
        <Text>📅 {historial.fecha}</Text>
      </View>
    </Card>
  );
}
