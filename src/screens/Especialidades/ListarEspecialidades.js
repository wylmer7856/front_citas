// src/screens/Especialidades/ListarEspecialidades.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { listarEspecialidades } from '../../api/especialidadesService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/Card';

export default function ListarEspecialidades() {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await listarEspecialidades(token);
      setEspecialidades(res.data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Especialidades Médicas</Text>
      <FlatList
        data={especialidades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card title={item.nombre}>
            <Text>ID: {item.id}</Text>
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
