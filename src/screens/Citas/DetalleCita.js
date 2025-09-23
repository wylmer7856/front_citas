// src/screens/Citas/DetalleCita.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { buscarCita } from '../../api/citasService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalleCita({ route }) {
  const { id } = route.params;
  const [cita, setCita] = useState(null);

  useEffect(() => {
    const fetchCita = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await buscarCita(id, token);
      setCita(res.data);
    };
    fetchCita();
  }, []);

  if (!cita) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de Cita #{id}</Text>
      <Text>Paciente ID: {cita.id_paciente}</Text>
      <Text>Médico-Especialidad ID: {cita.id_medico_especialidad}</Text>
      <Text>Fecha: {cita.fecha}</Text>
      <Text>Hora: {cita.hora}</Text>
      <Text>Estado: {cita.estado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
