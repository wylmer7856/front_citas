import React from "react";
import { View } from "react-native";
import HistorialForm from "../../../components/forms/HistorialForm";

export default function EditarHistorialScreen({ route, navigation }) {
  const { historial } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <HistorialForm initialValues={historial} onSubmit={() => navigation.goBack()} />
    </View>
  );
}
