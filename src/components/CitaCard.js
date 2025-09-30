import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CitaCard = ({ cita }) => (
  <View style={styles.card}>
    <Text style={styles.title}>📅 {cita.fecha} - {cita.hora}</Text>
    <Text>Paciente: {cita.paciente?.user?.name}</Text>
    <Text>Médico: {cita.medico?.user?.name}</Text>
    <Text>Estado: {cita.estado}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});

export default CitaCard;
