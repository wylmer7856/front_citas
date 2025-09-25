// src/components/lists/EspecialidadesList.js
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import Card from "../common/Card";

export default function EspecialidadesList({ especialidades = [], onPressItem }) {
  if (especialidades.length === 0) {
    return <Text>No hay especialidades disponibles.</Text>;
  }

  return (
    <FlatList
      data={especialidades}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressItem?.(item)}>
          <Card>
            <Text>🏥 {item.nombre}</Text>
            <Text>{item.descripcion}</Text>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}
