import React from "react";
import { View } from "react-native";
import EspecialidadesList from "../../../components/lists/EspecialidadesList";

export default function ListarEspecialidadesScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <EspecialidadesList />
    </View>
  );
}
