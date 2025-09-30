import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { register } from '../../service/auth';

export default function RegisterUserScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'PACIENTE',
    especialidad: '',
    fecha_nacimiento: '',
    telefono: ''
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleRegister = async () => {
    const { name, email, password, role, especialidad, fecha_nacimiento, telefono } = form;

    if (!name || !email || !password) {
      return Alert.alert('Campos incompletos', 'Nombre, correo y contraseña son obligatorios');
    }

    if (role === 'MEDICO' && !especialidad) {
      return Alert.alert('Falta especialidad', 'Debes ingresar la especialidad médica');
    }

    if (role === 'PACIENTE' && (!fecha_nacimiento || !telefono)) {
      return Alert.alert('Datos faltantes', 'Fecha de nacimiento y teléfono son obligatorios');
    }

    try {
      await register(form);
      Alert.alert('✅ Registro exitoso', 'La cuenta ha sido creada correctamente', [
        { text: 'Volver', onPress: () => navigation.goBack() }
      ]);
      // Limpiar el formulario después del registro exitoso
      setForm({
        name: '',
        email: '',
        password: '',
        role: 'PACIENTE',
        especialidad: '',
        fecha_nacimiento: '',
        telefono: ''
      });
    } catch (e) {
      Alert.alert('Error', e.response?.data?.error || 'No se pudo completar el registro');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👤 Registro de Usuario</Text>

      <TextInput
        placeholder="Nombre completo"
        value={form.name}
        onChangeText={(v) => handleChange('name', v)}
        style={styles.input}
      />

      <TextInput
        placeholder="Correo electrónico"
        value={form.email}
        onChangeText={(v) => handleChange('email', v)}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        value={form.password}
        onChangeText={(v) => handleChange('password', v)}
        style={styles.input}
        secureTextEntry
      />

      <Text style={styles.label}>Rol</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.role}
          onValueChange={(v) => handleChange('role', v)}
          style={styles.picker}
        >
          <Picker.Item label="Paciente" value="PACIENTE" />
          <Picker.Item label="Médico" value="MEDICO" />
          <Picker.Item label="Administrador" value="ADMIN" />
        </Picker>
      </View>

      {form.role === 'MEDICO' && (
        <TextInput
          placeholder="Especialidad médica"
          value={form.especialidad}
          onChangeText={(v) => handleChange('especialidad', v)}
          style={styles.input}
        />
      )}

      {form.role === 'PACIENTE' && (
        <>
          <TextInput
            placeholder="Fecha de nacimiento (YYYY-MM-DD)"
            value={form.fecha_nacimiento}
            onChangeText={(v) => handleChange('fecha_nacimiento', v)}
            style={styles.input}
          />
          <TextInput
            placeholder="Teléfono"
            value={form.telefono}
            onChangeText={(v) => handleChange('telefono', v)}
            style={styles.input}
            keyboardType="phone-pad"
          />
        </>
      )}

      <Button title="Registrar Usuario" onPress={handleRegister} color="#3498db" />
      <Button title="Cancelar" onPress={() => navigation.goBack()} color="#e74c3c" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    flexGrow: 1, 
    backgroundColor: '#f9f9f9' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#2c3e50' 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 14,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 14,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  picker: {
    backgroundColor: '#fff',
  },
  label: { 
    fontWeight: 'bold', 
    marginBottom: 6, 
    color: '#34495e' 
  }
});