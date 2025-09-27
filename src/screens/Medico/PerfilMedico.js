import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InputField from '../../components/InputField';
import DropdownEspecialidades from '../../components/DropdownEspecialidades';
import { getMedico, updateMedico } from '../../api/medicos';

const PerfilMedico = () => {
  const [especialidad, setEspecialidad] = useState('');
  const [medicoId, setMedicoId] = useState(null);

  useEffect(() => {
    getMedico('me').then(res => {
      setEspecialidad(res.data.especialidad);
      setMedicoId(res.data.id);
    });
  }, []);

  const handleUpdate = async () => {
    await updateMedico(medicoId, { especialidad });
  };

  return (
    <View style={styles.container}>
      <InputField label="Especialidad" value={especialidad} onChangeText={setEspecialidad} />
      <Button title="Actualizar" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default PerfilMedico;
