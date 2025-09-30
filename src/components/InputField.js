import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputField = ({ value, onChangeText, placeholder, secureTextEntry = false }) => (
  <TextInput
    style={styles.input}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    placeholderTextColor="#999"
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default InputField;
