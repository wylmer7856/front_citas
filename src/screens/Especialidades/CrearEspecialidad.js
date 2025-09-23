// src/screens/Especialidades/CrearEspecialidad.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { crearEspecialidad } from '../../api/especialidadesService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CrearEspecialidad() {
  const [nombre, setNombre] = useState('');

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await crearEspecialidad(nombre, token);
      Alert.alert('Éxito', 'Especialidad creada correctamente');
      setNombre('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la especialidad');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Especialidad</Text>
      <Input placeholder="Nombre de la especialidad" value={nombre} onChangeText={setNombre} />
      <Button title="Crear" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
