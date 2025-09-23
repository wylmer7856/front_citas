// src/screens/Especialidades/EditarEspecialidad.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { buscarEspecialidad, editarEspecialidad } from '../../api/especialidadesService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarEspecialidad({ route }) {
  const { id } = route.params;
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await buscarEspecialidad(id, token);
      setNombre(res.data.nombre);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await editarEspecialidad(id, nombre, token);
      Alert.alert('Éxito', 'Especialidad actualizada');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Especialidad #{id}</Text>
      <Input placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <Button title="Guardar Cambios" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
