// src/screens/Historial/CrearHistorial.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { crearHistorial } from '../../api/historialService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CrearHistorial() {
  const [form, setForm] = useState({
    id_cita: '',
    diagnostico: '',
    receta: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await crearHistorial(form, token);
      Alert.alert('Éxito', 'Historial creado correctamente');
      setForm({ id_cita: '', diagnostico: '', receta: '' });
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el historial');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Historial Médico</Text>
      <Input placeholder="ID de la cita" value={form.id_cita} onChangeText={(v) => handleChange('id_cita', v)} />
      <Input placeholder="Diagnóstico" value={form.diagnostico} onChangeText={(v) => handleChange('diagnostico', v)} />
      <Input placeholder="Receta" value={form.receta} onChangeText={(v) => handleChange('receta', v)} />
      <Button title="Guardar Historial" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
