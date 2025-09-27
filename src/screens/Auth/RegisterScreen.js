import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import InputField from '../../components/InputField';
import RoleSelector from '../../components/RoleSelector';
import DropdownEspecialidades from '../../components/DropdownEspecialidades';
import DateTimePicker from '@react-native-community/datetimepicker';
import { register } from '../../api/auth';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [role, setRole] = useState('PACIENTE');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [especialidadId, setEspecialidadId] = useState(null);
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [telefono, setTelefono] = useState('');

  const handleRegister = async () => {
    const payload = { name, email, password, role };

    if (role === 'MEDICO') payload.especialidad_id = especialidadId;
    if (role === 'PACIENTE') {
      payload.fecha_nacimiento = fechaNacimiento.toISOString().split('T')[0];
      payload.telefono = telefono;
    }

    try {
      await register(payload);
      Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Error', 'No se pudo registrar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <RoleSelector selectedRole={role} onSelect={setRole} />
      <InputField label="Nombre" value={name} onChangeText={setName} placeholder="Tu nombre completo" />
      <InputField label="Email" value={email} onChangeText={setEmail} placeholder="correo@ejemplo.com" />
      <InputField label="Contraseña" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />

      {role === 'MEDICO' && (
        <DropdownEspecialidades
          especialidades={[{ id: 1, nombre: 'Cardiología' }, { id: 2, nombre: 'Pediatría' }]}
          selected={especialidadId}
          onSelect={setEspecialidadId}
        />
      )}

      {role === 'PACIENTE' && (
        <>
          <Text style={styles.label}>Fecha de nacimiento</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>{fechaNacimiento.toLocaleDateString('es-CO')}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={fechaNacimiento}
              mode="date"
              display="default"
              onChange={(e, date) => {
                setShowDatePicker(false);
                if (date) setFechaNacimiento(date);
              }}
            />
          )}
          <InputField label="Teléfono" value={telefono} onChangeText={setTelefono} placeholder="3001234567" />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { marginTop: 10, fontWeight: 'bold' },
  dateText: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    textAlign: 'center',
    marginTop: 10,
  },
  button: { backgroundColor: '#00c6ff', padding: 12, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { marginTop: 15, textAlign: 'center', color: '#007bff' },
});

export default RegisterScreen;
