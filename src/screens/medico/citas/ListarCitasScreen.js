import React from "react";
import { View } from "react-native";
import CitasList from "../../../components/lists/CitasList";

export default function ListarCitasScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <CitasList onSelect={(cita) => navigation.navigate("DetalleCita", { cita })} />
    </View>
  );
}
