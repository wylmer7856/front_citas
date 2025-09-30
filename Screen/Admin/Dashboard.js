import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../../src/components/Header';
import useAuth from '../../src/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Panel Administrativo" />

      <View style={styles.profile}>
        <Text style={styles.welcome}>Bienvenido, {user?.name}</Text>
        <Text style={styles.info}>Email: {user?.email}</Text>
        <Text style={styles.info}>Rol: {user?.role}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🔓 Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accesos rápidos</Text>
        
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Usuarios')}
          >
            <View style={[styles.iconContainer, {backgroundColor: '#e3f2fd'}]}>
              <Text style={styles.icon}>👥</Text>
            </View>
            <Text style={styles.cardTitle}>Usuarios</Text>
            <Text style={styles.cardDescription}>Gestionar usuarios del sistema</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Medicos')}
          >
            <View style={[styles.iconContainer, {backgroundColor: '#e8f5e9'}]}>
              <Text style={styles.icon}>👨‍⚕️</Text>
            </View>
            <Text style={styles.cardTitle}>Médicos</Text>
            <Text style={styles.cardDescription}>Administrar médicos y especialidades</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Pacientes')}
          >
            <View style={[styles.iconContainer, {backgroundColor: '#fff9c4'}]}>
              <Text style={styles.icon}>👤</Text>
            </View>
            <Text style={styles.cardTitle}>Pacientes</Text>
            <Text style={styles.cardDescription}>Gestionar pacientes registrados</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Citas')}
          >
            <View style={[styles.iconContainer, {backgroundColor: '#f3e5f5'}]}>
              <Text style={styles.icon}>📅</Text>
            </View>
            <Text style={styles.cardTitle}>Citas</Text>
            <Text style={styles.cardDescription}>Administrar citas médicas</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RegisterUser')}
          >
            <View style={[styles.iconContainer, {backgroundColor: '#ffccbc'}]}>
              <Text style={styles.icon}>➕</Text>
            </View>
            <Text style={styles.cardTitle}>Registrar</Text>
            <Text style={styles.cardDescription}>Añadir nuevos usuarios al sistema</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  profile: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    elevation: 2,
  },
  welcome: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#2c3e50' },
  info: { fontSize: 16, color: '#7f8c8d', marginBottom: 4 },
  logoutButton: {
    marginTop: 12,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  logoutText: { color: '#fff', fontWeight: 'bold' },
  section: { marginHorizontal: 16, marginTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#2c3e50' },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    flex: 0.48,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  icon: {
    fontSize: 24
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 6
  },
  cardDescription: {
    fontSize: 12,
    color: '#7f8c8d'
  },
});

export default Dashboard;
