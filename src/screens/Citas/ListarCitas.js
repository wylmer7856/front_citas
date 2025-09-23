// src/screens/Citas/ListarCitas.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { listarCitas } from '../../api/citasService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/Card';

export default function ListarCitas() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await listarCitas(token);
      setCitas(res.data);
    };
    fetchCitas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Citas</Text>
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card title={`Cita #${item.id}`}>
            <Text>Fecha: {item.fecha}</Text>
            <Text>Hora: {item.hora}</Text>
            <Text>Estado: {item.estado}</Text>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
