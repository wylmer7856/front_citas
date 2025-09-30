import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MedicoCard = ({ medico }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{medico.user?.name}</Text>
    <Text>{medico.user?.email}</Text>
    <Text>Especialidad: {medico.especialidad}</Text>
    <Text>Documento: {medico.documento}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e8f5e9',
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

export default MedicoCard;
