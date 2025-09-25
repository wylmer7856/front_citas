// src/components/forms/HistorialForm.js
import React, { useState } from "react";
import { View } from "react-native";
import Input from "../common/Input";
import Button from "../common/Button";

export default function HistorialForm({ onSubmit, initialValues = {} }) {
  const [descripcion, setDescripcion] = useState(initialValues.descripcion || "");
  const [pacienteId, setPacienteId] = useState(initialValues.pacienteId || "");
  const [medicoId, setMedicoId] = useState(initialValues.medicoId || "");

  const handleSubmit = () => {
    if (!descripcion || !pacienteId || !medicoId) return alert("Todos los campos son requeridos");
    onSubmit({ descripcion, pacienteId, medicoId });
  };

  return (
    <View>
      <Input label="Descripción" value={descripcion} onChangeText={setDescripcion} />
      <Input label="ID Paciente" value={pacienteId} onChangeText={setPacienteId} />
      <Input label="ID Médico" value={medicoId} onChangeText={setMedicoId} />
      <Button title="Guardar Historial" onPress={handleSubmit} />
    </View>
  );
}
