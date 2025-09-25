// src/components/forms/EspecialidadForm.js
import React, { useState } from "react";
import { View } from "react-native";
import Input from "../common/Input";
import Button from "../common/Button";

export default function EspecialidadForm({ onSubmit, initialValues = {} }) {
  const [nombre, setNombre] = useState(initialValues.nombre || "");
  const [descripcion, setDescripcion] = useState(initialValues.descripcion || "");

  const handleSubmit = () => {
    if (!nombre) return alert("El nombre es requerido");
    onSubmit({ nombre, descripcion });
  };

  return (
    <View>
      <Input label="Nombre" value={nombre} onChangeText={setNombre} />
      <Input label="Descripción" value={descripcion} onChangeText={setDescripcion} />
      <Button title="Guardar Especialidad" onPress={handleSubmit} />
    </View>
  );
}
