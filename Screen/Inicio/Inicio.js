import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo-clinica.png')} // Usa tu logo aquí
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bienvenido a la Clínica Virtual</Text>
      <Text style={styles.subtitle}>Agenda tus citas, gestiona tu perfil y accede a servicios médicos desde tu móvil</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondary]} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#7f8c8d', textAlign: 'center', marginBottom: 30 },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
  },
  secondary: { backgroundColor: '#27ae60' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});
