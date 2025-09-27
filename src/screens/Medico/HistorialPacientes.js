import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getPacientes } from '../../api/pacientes';

const HistorialPacientes = () => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    getPacientes().then(res => setPacientes(res.data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de pacientes</Text>
      <FlatList
        data={pacientes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.user.name}</Text>
            <Text>Teléfono: {item.telefono}</Text>
            <Text>Fecha nacimiento: {item.fecha_nacimiento}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
});

export default HistorialPacientes;
