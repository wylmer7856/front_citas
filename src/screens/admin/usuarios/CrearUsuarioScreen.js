// src/screens/admin/usuarios/CrearUsuarioScreen.js
import React from "react";
import { View } from "react-native";
import UsuarioForm from "../../../components/forms/UsuarioForm";

export default function CrearUsuarioScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <UsuarioForm onSubmit={() => navigation.goBack()} />
    </View>
  );
}
