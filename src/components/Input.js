// src/components/Input.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function Input({ value, onChangeText, placeholder, secureTextEntry = false }) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
  },
});
