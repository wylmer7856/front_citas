// src/screens/admin/usuarios/EditarUsuarioScreen.js
import React from "react";
import { View } from "react-native";
import UsuarioForm from "../../../components/forms/UsuarioForm";

export default function EditarUsuarioScreen({ route, navigation }) {
  const { usuario } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <UsuarioForm initialValues={usuario} onSubmit={() => navigation.goBack()} />
    </View>
  );
}
