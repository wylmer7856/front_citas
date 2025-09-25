// src/components/cards/UsuarioCard.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export default function UsuarioCard({ usuario, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{usuario.nombre}</Text>
      <Text style={styles.email}>{usuario.email}</Text>
      <Text style={styles.role}>{usuario.rol}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: fonts.sizes.medium,
    fontWeight: "bold",
  },
  email: {
    color: colors.gray,
  },
  role: {
    fontSize: fonts.sizes.small,
    color: colors.secondary,
  },
});
