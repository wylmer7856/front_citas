import React from "react";
import { View } from "react-native";
import EspecialidadForm from "../../../components/forms/EspecialidadForm";

export default function EditarEspecialidadScreen({ route, navigation }) {
  const { especialidad } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <EspecialidadForm initialValues={especialidad} onSubmit={() => navigation.goBack()} />
    </View>
  );
}
