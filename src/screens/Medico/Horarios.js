import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import CalendarPicker from '../../components/CalendarPicker';
import TimePicker from '../../components/TimePicker';
import HorarioCard from '../../components/HorarioCard';
import { getHorarios, createHorario, deleteHorario } from '../../api/horarios';

const Horarios = () => {
  const [dia, setDia] = useState('');
  const [horaInicio, setHoraInicio] = useState(new Date());
  const [horaFin, setHoraFin] = useState(new Date());
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    getHorarios().then(res => setHorarios(res.data));
  }, []);

  const handleGuardar = async () => {
    await createHorario({
      dia,
      hora_inicio: horaInicio.toTimeString().slice(0, 5),
      hora_fin: horaFin.toTimeString().slice(0, 5),
    });
    const res = await getHorarios();
    setHorarios(res.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Definir horario</Text>
      <CalendarPicker onDaySelect={setDia} />
      <TimePicker label="Hora inicio" value={horaInicio} onChange={setHoraInicio} />
      <TimePicker label="Hora fin" value={horaFin} onChange={setHoraFin} />
      <Button title="Guardar horario" onPress={handleGuardar} />

      <FlatList
        data={horarios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <HorarioCard horario={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});

export default Horarios;
