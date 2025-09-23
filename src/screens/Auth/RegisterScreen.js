// src/screens/Auth/RegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    rol: 'PACIENTE', // valor por defecto
  });

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://172.20.10.5:8000/api/register', formData);
      Alert.alert('Éxito', 'Usuario registrado exitosamente');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={formData.nombre}
        onChangeText={(text) => setFormData({ ...formData, nombre: text })}
      />
      <TextInput
        placeholder="Apellido"
        style={styles.input}
        value={formData.apellido}
        onChangeText={(text) => setFormData({ ...formData, apellido: text })}
      />
      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        placeholder="Teléfono"
        style={styles.input}
        keyboardType="phone-pad"
        value={formData.telefono}
        onChangeText={(text) => setFormData({ ...formData, telefono: text })}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />

      <Picker
        selectedValue={formData.rol}
        onValueChange={(value) => setFormData({ ...formData, rol: value })}
        style={styles.picker}
      >
        <Picker.Item label="Paciente" value="PACIENTE" />
        <Picker.Item label="Administrador" value="ADMIN" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f8',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  picker: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
