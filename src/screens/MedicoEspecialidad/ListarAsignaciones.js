// src/screens/MedicoEspecialidad/ListarAsignaciones.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { listarAsignaciones } from '../../api/medicoEspecialidadService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/Card';

export default function ListarAsignaciones() {
  const [asignaciones, setAsignaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await listarAsignaciones(token);
      setAsignaciones(res.data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignaciones Médico-Especialidad</Text>
      <FlatList
        data={asignaciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card title={`Asignación #${item.id}`}>
            <Text>ID Médico: {item.id_medico}</Text>
            <Text>ID Especialidad: {item.id_especialidad}</Text>
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
