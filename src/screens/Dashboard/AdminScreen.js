// src/screens/Dashboard/AdminScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function AdminScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administrador</Text>
      <Button title="Gestionar Usuarios" onPress={() => navigation.navigate('ListarUsuarios')} />
      <Button title="Especialidades" onPress={() => navigation.navigate('ListarEspecialidades')} />
      <Button title="Asignar Especialidades" onPress={() => navigation.navigate('ListarAsignaciones')} />
      <Button title="Historiales Médicos" onPress={() => navigation.navigate('ListarHistorial')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
