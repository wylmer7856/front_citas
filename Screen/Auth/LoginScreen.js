import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { login as loginApi } from '../../service/auth';
import useAuth from '../../src/hooks/useAuth';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const { login } = useAuth(); // ← del contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      console.log('=== INICIANDO LOGIN ===');
      console.log('Email:', email);
      
      const res = await loginApi({ email, password });
      console.log('=== LOGIN EXITOSO ===');
      console.log('Respuesta recibida:', res);
      
      await login(res);
      console.log('=== USUARIO GUARDADO EN CONTEXTO ===');
      
    } catch (e) {
      console.log('=== ERROR EN LOGIN ===');
      console.log('Error completo:', e);
      console.log('Mensaje:', e.message);
      
      Alert.alert('Error', e.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      
      <LinearGradient
        colors={['#3498db', '#2980b9', '#1a5276']}
        style={styles.background}
      />
      
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../src/assets/logo-clinica.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Iniciar Sesión</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Correo electrónico</Text>
          <TextInput
            placeholder="Ingresa tu correo"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contraseña</Text>
          <TextInput
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#999"
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ¿No tienes cuenta? 
          <Text 
            style={styles.registerLink} 
            onPress={() => navigation.navigate('Register')}
          > Regístrate aquí</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 20,
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center', 
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  formContainer: {
    width: width * 0.85,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loader: {
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 16,
  },
  registerLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
});
