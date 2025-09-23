// src/screens/Usuarios/CrearUsuario.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { crearUsuario } from '../../api/usuariosService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CrearUsuario() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    tipo_usuario: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await crearUsuario(form, token);
      Alert.alert('Éxito', 'Usuario creado correctamente');
      setForm({ nombre: '', apellido: '', email: '', password: '', tipo_usuario: '' });
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Usuario</Text>
      <Input placeholder="Nombre" value={form.nombre} onChangeText={(v) => handleChange('nombre', v)} />
      <Input placeholder="Apellido" value={form.apellido} onChangeText={(v) => handleChange('apellido', v)} />
      <Input placeholder="Email" value={form.email} onChangeText={(v) => handleChange('email', v)} />
      <Input placeholder="Contraseña" value={form.password} onChangeText={(v) => handleChange('password', v)} secureTextEntry />
      <Input placeholder="Tipo de usuario (ADMIN, MEDICO, PACIENTE)" value={form.tipo_usuario} onChangeText={(v) => handleChange('tipo_usuario', v)} />
      <Button title="Crear" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
