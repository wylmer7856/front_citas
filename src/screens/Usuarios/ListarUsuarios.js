// src/screens/Usuarios/ListarUsuarios.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { listarUsuarios } from '../../api/usuariosService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../../components/Card';

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await listarUsuarios(token);
      setUsuarios(res.data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios Registrados</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card title={`${item.nombre} ${item.apellido}`}>
            <Text>Email: {item.email}</Text>
            <Text>Rol: {item.tipo_usuario}</Text>
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
