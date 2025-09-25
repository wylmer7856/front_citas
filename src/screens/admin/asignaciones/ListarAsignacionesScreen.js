import React from "react";
import { View } from "react-native";
import MedicoEspecialidadList from "../../../components/lists/MedicoEspecialidadList";

export default function ListarAsignacionesScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <MedicoEspecialidadList />
    </View>
  );
}
