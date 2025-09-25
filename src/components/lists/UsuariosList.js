// src/components/lists/UsuariosList.js
import React from "react";
import { FlatList } from "react-native";
import UsuarioCard from "../cards/UsuarioCard";

export default function UsuariosList({ usuarios, onPress }) {
  return (
    <FlatList
      data={usuarios}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <UsuarioCard usuario={item} onPress={() => onPress(item)} />
      )}
    />
  );
}
