import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PacienteCard = ({ paciente }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{paciente.user?.name}</Text>
    <Text>{paciente.user?.email}</Text>
    <Text>Documento: {paciente.documento}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff3e0',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});

export default PacienteCard;
