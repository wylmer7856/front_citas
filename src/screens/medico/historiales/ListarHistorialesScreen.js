import React from "react";
import { View } from "react-native";
import HistorialList from "../../../components/lists/HistorialList";

export default function ListarHistorialesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <HistorialList onSelect={(historial) => navigation.navigate("DetalleHistorial", { historial })} />
    </View>
  );
}
