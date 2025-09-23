// src/screens/Historial/EditarHistorial.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { buscarHistorial, editarHistorial } from '../../api/historialService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarHistorial({ route }) {
  const { id } = route.params;
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await buscarHistorial(id, token);
      setForm(res.data);
    };
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await editarHistorial(id, form, token);
      Alert.alert('Éxito', 'Historial actualizado');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el historial');
    }
  };

  if (!form) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Historial #{id}</Text>
      <Input placeholder="Diagnóstico" value={form.diagnostico} onChangeText={(v) => handleChange('diagnostico', v)} />
      <Input placeholder="Receta" value={form.receta} onChangeText={(v) => handleChange('receta', v)} />
      <Button title="Guardar Cambios" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
