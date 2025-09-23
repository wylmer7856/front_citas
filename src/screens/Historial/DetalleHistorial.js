// src/screens/Historial/DetalleHistorial.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { buscarHistorial } from '../../api/historialService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalleHistorial({ route }) {
  const { id } = route.params;
  const [historial, setHistorial] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await buscarHistorial(id, token);
      setHistorial(res.data);
    };
    fetchData();
  }, []);

  if (!historial) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Historial</Text>
      <Text>ID Cita: {historial.id_cita}</Text>
      <Text>Diagnóstico: {historial.diagnostico}</Text>
      <Text>Receta: {historial.receta}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
