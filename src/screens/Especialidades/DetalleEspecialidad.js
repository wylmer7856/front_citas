// src/screens/Especialidades/DetalleEspecialidad.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { buscarEspecialidad } from '../../api/especialidadesService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalleEspecialidad({ route }) {
  const { id } = route.params;
  const [especialidad, setEspecialidad] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await buscarEspecialidad(id, token);
      setEspecialidad(res.data);
    };
    fetchData();
  }, []);

  if (!especialidad) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de Especialidad</Text>
      <Text>ID: {especialidad.id}</Text>
      <Text>Nombre: {especialidad.nombre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
