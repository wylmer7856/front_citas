import React from "react";
import { View } from "react-native";
import EspecialidadForm from "../../../components/forms/EspecialidadForm";

export default function CrearEspecialidadScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <EspecialidadForm onSubmit={() => navigation.goBack()} />
    </View>
  );
}
