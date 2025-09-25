import React from "react";
import { View } from "react-native";
import CitaCard from "../../../components/cards/CitaCard";

export default function DetalleCitaScreen({ route }) {
  const { cita } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <CitaCard cita={cita} />
    </View>
  );
}
