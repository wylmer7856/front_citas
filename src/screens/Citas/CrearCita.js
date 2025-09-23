// src/screens/Citas/CrearCita.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { crearCita } from '../../api/citasService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CrearCita() {
  const [form, setForm] = useState({
    id_paciente: '',
    id_medico_especialidad: '',
    fecha: '',
    hora: '',
    estado: 'PENDIENTE',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await crearCita(form, token);
      Alert.alert('Éxito', 'Cita creada correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la cita');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cita</Text>
      <Input placeholder="ID Paciente" value={form.id_paciente} onChangeText={(v) => handleChange('id_paciente', v)} />
      <Input placeholder="ID Médico-Especialidad" value={form.id_medico_especialidad} onChangeText={(v) => handleChange('id_medico_especialidad', v)} />
      <Input placeholder="Fecha (YYYY-MM-DD)" value={form.fecha} onChangeText={(v) => handleChange('fecha', v)} />
      <Input placeholder="Hora (HH:MM)" value={form.hora} onChangeText={(v) => handleChange('hora', v)} />
      <Button title="Crear Cita" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
