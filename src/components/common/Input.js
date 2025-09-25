// src/components/common/Input.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { spacing } from "../../styles/spacing";



export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  style,
  ...props
}) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: {
    fontSize: fonts.sizes.small,
    marginBottom: 4,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 10,
    fontSize: fonts.sizes.medium,
    color: colors.text,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    marginTop: 4,
    color: colors.danger,
    fontSize: fonts.sizes.small,
  },
});
