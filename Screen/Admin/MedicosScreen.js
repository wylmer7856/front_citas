import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator
} from 'react-native';
import { AdminService } from '../../service/adminService';
import Header from '../../src/components/Header';

export default function MedicosScreen({ navigation }) {
  const [medicos, setMedicos] = useState([]);

  const cargar = async () => {
    try {
      const data = await AdminService.getAllMedicos();
      setMedicos(data || []);
    } catch (error) {
      console.error('Error al cargar médicos:', error);
      Alert.alert('Error', 'No se pudieron cargar los médicos');
    }
  };

  const eliminar = async (id) => {
    Alert.alert('¿Eliminar médico?', 'Esta acción no se puede deshacer', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await AdminService.deleteMedico(id);
            Alert.alert('Éxito', 'Médico eliminado correctamente');
            cargar();
          } catch (error) {
            console.error('Error al eliminar médico:', error);
            Alert.alert('Error', 'No se pudo eliminar el médico');
          }
        },
      },
    ]);
  };

  useEffect(() => { cargar(); }, []);

  const renderItem = ({ item }) => {
    const nombre = item.user?.name || item.nombre || '—';
    const email = item.user?.email || '—';
    const especialidad = item.especialidad || '—';
    const telefono = item.telefono || 'No disponible';
    const horario = item.horario || 'No especificado';

    return (
      <View style={styles.card}>
        <Text style={styles.title}>👨‍⚕️ {nombre}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📧 Email:</Text>
          <Text style={styles.infoValue}>{email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🏥 Especialidad:</Text>
          <Text style={styles.infoValue}>{especialidad}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📱 Teléfono:</Text>
          <Text style={styles.infoValue}>{telefono}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🕒 Horario:</Text>
          <Text style={styles.infoValue}>{horario}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => eliminar(item.id)}>
          <Text style={styles.deleteText}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="👨‍⚕️ Médicos" showBack={true} onBackPress={() => navigation.goBack()} />
      <FlatList
        data={medicos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.empty}>No hay médicos registrados</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { fontSize: 20, fontWeight: 'bold', margin: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 12,
    color: '#2c3e50'
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center'
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7f8c8d',
    width: 150
  },
  infoValue: {
    fontSize: 14,
    color: '#34495e',
    flex: 1
  },
  deleteButton: {
    marginTop: 12,
    backgroundColor: '#ffebee',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  deleteText: { 
    color: '#e74c3c', 
    fontWeight: 'bold' 
  },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#999' },
});
