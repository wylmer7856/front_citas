import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CitaCard = ({ cita }) => (
  <View style={styles.card}>
    <Text style={styles.title}>Cita con: {cita.medico?.user?.name}</Text>
    <Text>Fecha: {cita.fecha_hora}</Text>
    <Text>Motivo: {cita.motivo || 'Sin motivo'}</Text>
    <Text>Estado: {cita.estado}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderRadius: 8, marginVertical: 6 },
  title: { fontWeight: 'bold', marginBottom: 4 }
});

export default CitaCard;
