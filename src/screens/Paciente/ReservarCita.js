import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import CalendarPicker from '../../components/CalendarPicker';
import TimePicker from '../../components/TimePicker';
import DropdownEspecialidades from '../../components/DropdownEspecialidades';
import { getMedicos } from '../../api/medicos';
import { createCita } from '../../api/citas';

const ReservarCita = () => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState(new Date());
  const [medicoId, setMedicoId] = useState(null);
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    getMedicos().then(res => {
      const opciones = res.data.map(m => ({
        id: m.id,
        nombre: m.user.name + ' - ' + m.especialidad,
      }));
      setEspecialidades(opciones);
    });
  }, []);

  const handleReservar = async () => {
    await createCita({
      medico_id: medicoId,
      fecha_hora: `${fecha}T${hora.toTimeString().slice(0, 5)}`,
      motivo: 'Consulta general',
    });
    Alert.alert('Cita reservada');
  };

  return (
    <View style={styles.container}>
      <CalendarPicker onDaySelect={setFecha} />
      <TimePicker label="Hora" value={hora} onChange={setHora} />
      <DropdownEspecialidades especialidades={especialidades} selected={medicoId} onSelect={setMedicoId} />
      <Button title="Reservar cita" onPress={handleReservar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default ReservarCita;
