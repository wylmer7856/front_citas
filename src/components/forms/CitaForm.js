// src/components/forms/CitaForm.js
import React, { useState } from "react";
import { View } from "react-native";
import Input from "../common/Input";
import Button from "../common/Button";
import { formatDate } from "../../utils/dateUtils";

export default function CitaForm({ onSubmit, initialValues = {} }) {
  const [fecha, setFecha] = useState(initialValues.fecha || "");
  const [hora, setHora] = useState(initialValues.hora || "");
  const [medicoId, setMedicoId] = useState(initialValues.medicoId || "");
  const [pacienteId, setPacienteId] = useState(initialValues.pacienteId || "");

  const handleSubmit = () => {
    if (!fecha || !hora || !medicoId || !pacienteId) return alert("Todos los campos son requeridos");
    onSubmit({ fecha: formatDate(fecha), hora, medicoId, pacienteId });
  };

  return (
    <View>
      <Input label="Fecha" value={fecha} onChangeText={setFecha} placeholder="YYYY-MM-DD" />
      <Input label="Hora" value={hora} onChangeText={setHora} placeholder="HH:MM" />
      <Input label="ID Médico" value={medicoId} onChangeText={setMedicoId} />
      <Input label="ID Paciente" value={pacienteId} onChangeText={setPacienteId} />
      <Button title="Agendar Cita" onPress={handleSubmit} />
    </View>
  );
}
