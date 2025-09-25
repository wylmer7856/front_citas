// src/screens/admin/usuarios/ListarUsuariosScreen.js
import React from "react";
import { View } from "react-native";
import UsuariosList from "../../../components/lists/UsuariosList";

export default function ListarUsuariosScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <UsuariosList onSelect={(usuario) => navigation.navigate("DetalleUsuario", { usuario })} />
    </View>
  );
}
