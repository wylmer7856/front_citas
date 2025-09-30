import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  ScrollView, 
  Image, 
  StatusBar,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { register } from '../../service/auth';
import useAuth from '../../src/hooks/useAuth';

const { width } = Dimensions.get('window');

export default function Register({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'PACIENTE', // Fijo como PACIENTE
    fecha_nacimiento: '',
    telefono: ''
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleRegister = async () => {
    const { name, email, password, fecha_nacimiento, telefono } = form;

    if (!name || !email || !password) {
      return Alert.alert('Campos incompletos', 'Nombre, correo y contraseña son obligatorios');
    }

    if (!fecha_nacimiento || !telefono) {
      return Alert.alert('Datos faltantes', 'Fecha de nacimiento y teléfono son obligatorios');
    }

    try {
      await register(form);
      Alert.alert('✅ Registro exitoso', 'Tu cuenta ha sido creada correctamente', [
        { text: 'Ir al login', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (e) {
      Alert.alert('Error', e.response?.data?.error || 'No se pudo completar el registro');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      
      <LinearGradient
        colors={['#3498db', '#2980b9', '#1a5276']}
        style={styles.background}
      />
      
      <View style={styles.headerContainer}>
        <Image 
          source={require('../../src/assets/logo-clinica.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Registro de Paciente</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre completo</Text>
            <TextInput
              placeholder="Ingresa tu nombre"
              value={form.name}
              onChangeText={(v) => handleChange('name', v)}
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Correo electrónico</Text>
            <TextInput
              placeholder="Ingresa tu correo"
              value={form.email}
              onChangeText={(v) => handleChange('email', v)}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput
              placeholder="Crea una contraseña segura"
              value={form.password}
              onChangeText={(v) => handleChange('password', v)}
              style={styles.input}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          <Text style={styles.sectionTitle}>Datos de Paciente</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Fecha de nacimiento</Text>
            <TextInput
              placeholder="YYYY-MM-DD"
              value={form.fecha_nacimiento}
              onChangeText={(v) => handleChange('fecha_nacimiento', v)}
              style={styles.input}
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Teléfono</Text>
            <TextInput
              placeholder="Ingresa tu número de teléfono"
              value={form.telefono}
              onChangeText={(v) => handleChange('telefono', v)}
              style={styles.input}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ¿Ya tienes cuenta? 
          <Text 
            style={styles.loginLink} 
            onPress={() => navigation.navigate('Login')}
          > Inicia sesión</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  picker: {
    height: 50,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  registerButton: {
    backgroundColor: '#27ae60',
    borderRadius: 10,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
