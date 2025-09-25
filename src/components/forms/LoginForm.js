// src/components/forms/LoginForm.js
import React, { useState } from "react";
import { View } from "react-native";
import Input from "../common/Input";
import Button from "../common/Button";
import { isValidEmail, isValidPassword } from "../../utils/validators";

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!isValidEmail(email)) return alert("Email inválido");
    if (!isValidPassword(password)) return alert("Contraseña mínima 6 caracteres");
    onSubmit({ email, password });
  };

  return (
    <View>
      <Input placeholder="Correo" value={email} onChangeText={setEmail} />
      <Input placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Iniciar Sesión" onPress={handleSubmit} />
    </View>
  );
}
