// src/screens/Citas/CrearEditarCita.js
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import citasService from "../../api/citasService";

export default function CrearEditarCita() {
  const [paciente, setPaciente] = useState("");
  const [medico, setMedico] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};

  useEffect(() => {
    if (id) {
      const cargarCita = async () => {
        try {
          const data = await citasService.getCita(id);
          setPaciente(data.paciente_nombre);
          setMedico(data.medico_nombre);
          setEspecialidad(data.especialidad);
          setFecha(data.fecha);
          setHora(data.hora);
        } catch (error) {
          console.error("Error al cargar cita:", error);
        }
      };
      cargarCita();
    }
  }, [id]);

  const guardarCita = async () => {
    try {
      const nuevaCita = {
        paciente_nombre: paciente,
        medico_nombre: medico,
        especialidad,
        fecha,
        hora,
      };

      if (id) {
        await citasService.updateCita(id, nuevaCita);
      } else {
        await citasService.createCita(nuevaCita);
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar cita:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {id ? "Editar Cita" : "Nueva Cita"}
      </Text>
      <Text>Paciente</Text>
      <TextInput
        value={paciente}
        onChangeText={setPaciente}
        style={{ borderWidth: 1, marginBottom: 8, padding: 5 }}
      />
      <Text>Médico</Text>
      <TextInput
        value={medico}
        onChangeText={setMedico}
        style={{ borderWidth: 1, marginBottom: 8, padding: 5 }}
      />
      <Text>Especialidad</Text>
      <TextInput
        value={especialidad}
        onChangeText={setEspecialidad}
        style={{ borderWidth: 1, marginBottom: 8, padding: 5 }}
      />
      <Text>Fecha</Text>
      <TextInput
        value={fecha}
        onChangeText={setFecha}
        placeholder="YYYY-MM-DD"
        style={{ borderWidth: 1, marginBottom: 8, padding: 5 }}
      />
      <Text>Hora</Text>
      <TextInput
        value={hora}
        onChangeText={setHora}
        placeholder="HH:MM"
        style={{ borderWidth: 1, marginBottom: 8, padding: 5 }}
      />

      <Button title="Guardar" onPress={guardarCita} />
    </View>
  );
}
