// src/screens/auth/LoginScreen.js
import React, { useContext, useState } from "react";
import { View, Text, Alert } from "react-native";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert("Error", "Credenciales incorrectas o fallo en conexión.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Iniciar Sesión
      </Text>
      <Input label="Correo" value={email} onChangeText={setEmail} />
      <Input
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Ingresar" onPress={handleLogin} />
      <Button
        title="¿No tienes cuenta? Regístrate"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}
