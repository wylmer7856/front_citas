import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const roles = ['ADMIN', 'MEDICO', 'PACIENTE'];

const RoleSelector = ({ selectedRole, onSelect }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Selecciona tu rol:</Text>
    {roles.map(role => (
      <TouchableOpacity
        key={role}
        style={[styles.button, selectedRole === role && styles.selected]}
        onPress={() => onSelect(role)}
      >
        <Text style={styles.text}>{role}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  label: { fontWeight: 'bold', marginBottom: 8 },
  button: { padding: 10, borderWidth: 1, borderRadius: 6, marginBottom: 6 },
  selected: { backgroundColor: '#007bff', borderColor: '#007bff' },
  text: { color: '#000' }
});

export default RoleSelector;
