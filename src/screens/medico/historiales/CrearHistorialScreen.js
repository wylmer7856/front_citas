import React from "react";
import { View } from "react-native";
import HistorialForm from "../../../components/forms/HistorialForm";

export default function CrearHistorialScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <HistorialForm onSubmit={() => navigation.goBack()} />
    </View>
  );
}
