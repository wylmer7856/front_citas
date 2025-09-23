// src/screens/Usuarios/EditarUsuario.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { buscarUsuario, editarUsuario } from '../../api/usuariosService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarUsuario({ route }) {
  const { id } = route.params;
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await buscarUsuario(id, token);
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
      await editarUsuario(id, form, token);
      Alert.alert('Éxito', 'Usuario actualizado');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el usuario');
    }
  };

  if (!form) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario #{id}</Text>
      <Input placeholder="Nombre" value={form.nombre} onChangeText={(v) => handleChange('nombre', v)} />
      <Input placeholder="Apellido" value={form.apellido} onChangeText={(v) => handleChange('apellido', v)} />
      <Input placeholder="Email" value={form.email} onChangeText={(v) => handleChange('email', v)} />
      <Input placeholder="Tipo de usuario" value={form.tipo_usuario} onChangeText={(v) => handleChange('tipo_usuario', v)} />
      <Input placeholder="Contraseña (opcional)" value={form.password} onChangeText={(v) => handleChange('password', v)} secureTextEntry />
      <Button title="Guardar Cambios" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
