// src/components/lists/MedicoEspecialidadList.js
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import Card from "../common/Card";

export default function MedicoEspecialidadList({ asignaciones = [], onPressItem }) {
  if (asignaciones.length === 0) {
    return <Text>No hay asignaciones de médicos a especialidades.</Text>;
  }

  return (
    <FlatList
      data={asignaciones}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressItem?.(item)}>
          <Card>
            <Text>👨‍⚕️ Médico: {item.medico?.nombre}</Text>
            <Text>🏥 Especialidad: {item.especialidad?.nombre}</Text>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}
