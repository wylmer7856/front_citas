import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, Doctor</Text>
      <Text>Citas para hoy: 5</Text>
      <Text>Horarios activos: 3</Text>
      <Text>Pacientes atendidos esta semana: 12</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default Dashboard;
