// src/screens/Citas/EditarCita.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { buscarCita, editarCita } from '../../api/citasService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarCita({ route }) {
  const { id } = route.params;
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchCita = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await buscarCita(id, token);
      setForm(res.data);
    };
    fetchCita();
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await editarCita(id, form, token);
      Alert.alert('Éxito', 'Cita actualizada');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la cita');
    }
  };

  if (!form) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cita #{id}</Text>
      <Input placeholder="Fecha" value={form.fecha} onChangeText={(v) => handleChange('fecha', v)} />
      <Input placeholder="Hora" value={form.hora} onChangeText={(v) => handleChange('hora', v)} />
      <Input placeholder="Estado" value={form.estado} onChangeText={(v) => handleChange('estado', v)} />
      <Button title="Guardar Cambios" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
