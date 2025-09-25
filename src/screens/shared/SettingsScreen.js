// src/screens/shared/SettingsScreen.js
import React, { useState } from "react";
import { View, Text, Switch } from "react-native";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Configuración</Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
        <Text>🌙 Modo Oscuro</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
        <Text>🔔 Notificaciones</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>
    </View>
  );
}
