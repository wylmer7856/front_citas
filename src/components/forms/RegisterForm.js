import React, { useState } from "react";
import { View, Button } from "react-native";
import Input from "../common/Input";

export default function RegisterForm({ onSubmit }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rol: "PACIENTE", // por defecto paciente
    password: "",
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <View>
      <Input
        label="Nombre"
        value={form.nombre}
        onChangeText={(text) => handleChange("nombre", text)}
      />
      <Input
        label="Apellido"
        value={form.apellido}
        onChangeText={(text) => handleChange("apellido", text)}
      />
      <Input
        label="Correo"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <Input
        label="Teléfono"
        value={form.telefono}
        onChangeText={(text) => handleChange("telefono", text)}
      />
      <Input
        label="Contraseña"
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />

      {/* ⚡ si quieres elegir rol */}
      {/* <Input
        label="Rol"
        value={form.rol}
        onChangeText={(text) => handleChange("rol", text)}
      /> */}

      <Button title="Registrarse" onPress={handleSubmit} />
    </View>
  );
}
