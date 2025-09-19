// src/screens/Citas/DetalleCita.js
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import citasService from "../../api/citasService";

export default function DetalleCita() {
  const [cita, setCita] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    const cargarCita = async () => {
      try {
        const data = await citasService.getCita(id);
        setCita(data);
      } catch (error) {
        console.error("Error al obtener cita:", error);
      }
    };
    cargarCita();
  }, [id]);

  const eliminarCita = async () => {
    try {
      await citasService.deleteCita(id);
      navigation.goBack();
    } catch (error) {
      console.error("Error al eliminar cita:", error);
    }
  };

  if (!cita) return <Text>Cargando...</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Detalle de la Cita</Text>
      <Text>Paciente: {cita.paciente_nombre}</Text>
      <Text>Médico: {cita.medico_nombre}</Text>
      <Text>Especialidad: {cita.especialidad}</Text>
      <Text>Fecha: {cita.fecha}</Text>
      <Text>Hora: {cita.hora}</Text>

      <Button
        title="Editar"
        onPress={() => navigation.navigate("CrearEditarCita", { id: cita.id })}
      />
      <Button title="Eliminar" onPress={eliminarCita} color="red" />
    </View>
  );
}
