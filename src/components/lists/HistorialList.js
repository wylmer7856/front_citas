// src/components/lists/HistorialList.js
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import Card from "../common/Card";

export default function HistorialList({ historiales = [], onPressItem }) {
  if (historiales.length === 0) {
    return <Text>No hay historiales médicos.</Text>;
  }

  return (
    <FlatList
      data={historiales}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressItem?.(item)}>
          <Card>
            <Text>🧑 Paciente: {item.paciente?.nombre}</Text>
            <Text>👨‍⚕️ Médico: {item.medico?.nombre}</Text>
            <Text>📄 {item.descripcion}</Text>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}
