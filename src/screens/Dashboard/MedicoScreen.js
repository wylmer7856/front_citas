// src/screens/Dashboard/MedicoScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function MedicoScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Médico</Text>
      <Button title="Mis Especialidades" onPress={() => navigation.navigate('ListarAsignaciones')} />
      <Button title="Citas Asignadas" onPress={() => navigation.navigate('ListarCitas')} />
      <Button title="Historiales Médicos" onPress={() => navigation.navigate('ListarHistorial')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
