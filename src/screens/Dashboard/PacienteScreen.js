// src/screens/Dashboard/PacienteScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function PacienteScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Paciente</Text>
      <Button title="Mis Citas" onPress={() => navigation.navigate('ListarCitas')} />
      <Button title="Historial Médico" onPress={() => navigation.navigate('ListarHistorial')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
