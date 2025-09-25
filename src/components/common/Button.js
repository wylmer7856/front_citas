// src/components/common/Button.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export default function Button({ title, onPress, style, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  disabled: {
    backgroundColor: colors.gray,
  },
  text: {
    color: colors.white,
    fontSize: fonts.sizes.medium,
    fontWeight: "bold",
  },
});
