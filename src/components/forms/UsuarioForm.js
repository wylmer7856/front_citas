// src/components/forms/UsuarioForm.js
import React, { useState } from "react";
import { View } from "react-native";
import Input from "../common/Input";
import Button from "../common/Button";

export default function UsuarioForm({ onSubmit, initialValues = {} }) {
  const [nombre, setNombre] = useState(initialValues.nombre || "");
  const [email, setEmail] = useState(initialValues.email || "");
  const [rol, setRol] = useState(initialValues.rol || "paciente");

  const handleSubmit = () => {
    if (!nombre || !email) return alert("Todos los campos son requeridos");
    onSubmit({ nombre, email, rol });
  };

  return (
    <View>
      <Input label="Nombre" value={nombre} onChangeText={setNombre} />
      <Input label="Correo" value={email} onChangeText={setEmail} />
      <Input label="Rol" value={rol} onChangeText={setRol} />
      <Button title="Guardar Usuario" onPress={handleSubmit} />
    </View>
  );
}
