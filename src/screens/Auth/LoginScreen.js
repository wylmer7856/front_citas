// src/screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { login } from '../../api/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      
      // Guardar datos en AsyncStorage
      await AsyncStorage.setItem('token', res.data.access_token);
      await AsyncStorage.setItem('user', JSON.stringify(res.data.usuario));
      
      // Llamar la función onLogin que viene desde AppNavigation
      // Esto automáticamente redirigirá al dashboard correcto según el rol
      onLogin(res.data.usuario);
      
    } catch (error) {
      console.log('Error de login:', error.response?.data || error.message);
      Alert.alert('Error', 'Credenciales inválidas o servidor no disponible');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Input
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button 
        title={loading ? "Ingresando..." : "Ingresar"} 
        onPress={handleLogin}
        disabled={loading}
      />
      <Button
        title="¿No tienes cuenta? Regístrate"
        onPress={() => navigation.navigate('Register')}
        style={styles.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 30,
    textAlign: 'center',
    color: '#333'
  },
  secondary: { 
    backgroundColor: '#27ae60',
    marginTop: 10
  },
});