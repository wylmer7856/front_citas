import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { AdminService } from '../../service/adminService';
import Header from '../../src/components/Header';

export default function UsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);

  const cargar = async () => {
    try {
      const data = await AdminService.getAllUsers();
      setUsuarios(data || []);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      Alert.alert('Error', 'No se pudieron cargar los usuarios');
    }
  };

  const eliminar = async (id) => {
    Alert.alert('¿Eliminar usuario?', 'Esta acción no se puede deshacer', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await AdminService.deleteUser(id);
            Alert.alert('Éxito', 'Usuario eliminado correctamente');
            cargar();
          } catch (error) {
            console.error('Error al eliminar usuario:', error);
            Alert.alert('Error', 'No se pudo eliminar el usuario');
          }
        },
      },
    ]);
  };

  useEffect(() => { cargar(); }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name} ({item.role})</Text>
      <Text style={styles.email}>{item.email}</Text>
      <TouchableOpacity onPress={() => eliminar(item.id)}>
        <Text style={styles.delete}>🗑️ Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="👥 Usuarios" />
      <FlatList data={usuarios} keyExtractor={(u) => u.id.toString()} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2 },
  name: { fontSize: 16, fontWeight: 'bold' },
  email: { fontSize: 14, color: '#555' },
  delete: { color: '#e74c3c', marginTop: 8, fontWeight: 'bold' },
});
