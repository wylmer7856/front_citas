// src/components/cards/CitaCard.js
import React from "react";
import { Text, View } from "react-native";
import Card from "../common/Card";

export default function CitaCard({ cita }) {
  if (!cita) return null;

  return (
    <Card>
      <View>
        <Text>📅 {cita.fecha} - 🕒 {cita.hora}</Text>
        <Text>👨‍⚕️ Médico: {cita.medico?.nombre}</Text>
        <Text>🧑 Paciente: {cita.paciente?.nombre}</Text>
      </View>
    </Card>
  );
}
