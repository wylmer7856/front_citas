// src/screens/MedicoEspecialidad/AsignarEspecialidad.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { asignarEspecialidad } from '../../api/medicoEspecialidadService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AsignarEspecialidad() {
  const [form, setForm] = useState({
    id_medico: '',
    id_especialidad: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await asignarEspecialidad(form.id_medico, form.id_especialidad, token);
      Alert.alert('Éxito', 'Especialidad asignada correctamente');
      setForm({ id_medico: '', id_especialidad: '' });
    } catch (error) {
      Alert.alert('Error', 'No se pudo asignar la especialidad');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asignar Especialidad a Médico</Text>
      <Input placeholder="ID Médico" value={form.id_medico} onChangeText={(v) => handleChange('id_medico', v)} />
      <Input placeholder="ID Especialidad" value={form.id_especialidad} onChangeText={(v) => handleChange('id_especialidad', v)} />
      <Button title="Asignar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
