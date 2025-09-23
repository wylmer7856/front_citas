// src/screens/Usuarios/DetalleUsuario.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { buscarUsuario } from '../../api/usuariosService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalleUsuario({ route }) {
  const { id } = route.params;
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await buscarUsuario(id, token);
      setUsuario(res.data);
    };
    fetchData();
  }, []);

  if (!usuario) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Usuario</Text>
      <Text>ID: {usuario.id}</Text>
      <Text>Nombre: {usuario.nombre}</Text>
      <Text>Apellido: {usuario.apellido}</Text>
      <Text>Email: {usuario.email}</Text>
      <Text>Rol: {usuario.tipo_usuario}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
