import React from "react";
import { View, Text } from "react-native";
import EspecialidadesList from "../../../components/lists/EspecialidadesList";

export default function MisEspecialidadesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Mis Especialidades
      </Text>
      <EspecialidadesList onSelect={(esp) => navigation.navigate("DetalleEspecialidad", { esp })} />
    </View>
  );
}
