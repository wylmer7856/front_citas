import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InputField from '../../components/InputField';
import { getPaciente, updatePaciente } from '../../api/pacientes';

const PerfilPaciente = () => {
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [pacienteId, setPacienteId] = useState(null);

  useEffect(() => {
    getPaciente('me').then(res => {
      setTelefono(res.data.telefono);
      setFechaNacimiento(res.data.fecha_nacimiento);
      setPacienteId(res.data.id);
    });
  }, []);

  const handleUpdate = async () => {
    await updatePaciente(pacienteId, {
      telefono,
      fecha_nacimiento: fechaNacimiento,
    });
  };

  return (
    <View style={styles.container}>
      <InputField label="Teléfono" value={telefono} onChangeText={setTelefono} />
      <InputField label="Fecha de nacimiento" value={fechaNacimiento} onChangeText={setFechaNacimiento} />
      <Button title="Actualizar" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default PerfilPaciente;
