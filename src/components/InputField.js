import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const InputField = ({ label, value, onChangeText, placeholder, secureTextEntry = false }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  label: { fontWeight: 'bold', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10 }
});

export default InputField;
