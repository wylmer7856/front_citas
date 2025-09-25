import React from "react";
import { View } from "react-native";
import CitaForm from "../../../components/forms/CitaForm";

export default function CrearCitaScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <CitaForm onSubmit={() => navigation.goBack()} />
    </View>
  );
}
