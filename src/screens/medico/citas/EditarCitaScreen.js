import React from "react";
import { View } from "react-native";
import CitaForm from "../../../components/forms/CitaForm";

export default function EditarCitaScreen({ route, navigation }) {
  const { cita } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <CitaForm initialValues={cita} onSubmit={() => navigation.goBack()} />
    </View>
  );
}
