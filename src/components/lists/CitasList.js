// src/components/lists/CitasList.js
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Card from "../common/Card";

export default function CitasList({ citas = [], onPressItem }) {
  if (citas.length === 0) {
    return <Text>No hay citas registradas.</Text>;
  }

  return (
    <FlatList
      data={citas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressItem?.(item)}>
          <Card>
            <Text>📅 {item.fecha} - 🕒 {item.hora}</Text>
            <Text>👨‍⚕️ Médico: {item.medico?.nombre}</Text>
            <Text>🧑 Paciente: {item.paciente?.nombre}</Text>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}
