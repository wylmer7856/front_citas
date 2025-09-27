import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text>Próxima cita: 28/09/2025</Text>
      <Text>Estado: Confirmada</Text>
      <Text>Médico asignado: Dra. Camila</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default Dashboard;
