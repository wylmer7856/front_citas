import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HorarioCard = ({ horario }) => (
  <View style={styles.card}>
    <Text style={styles.title}>Día: {horario.dia}</Text>
    <Text>Inicio: {horario.hora_inicio}</Text>
    <Text>Fin: {horario.hora_fin}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderRadius: 8, marginVertical: 6 },
  title: { fontWeight: 'bold', marginBottom: 4 }
});

export default HorarioCard;
