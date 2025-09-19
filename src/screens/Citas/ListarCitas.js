// src/screens/Citas/ListarCitas.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import citasService from "../../api/citasService";

export default function ListarCitas() {
  const [citas, setCitas] = useState([]);
  const navigation = useNavigation();

  const cargarCitas = async () => {
    try {
      const data = await citasService.getCitas();
      setCitas(data);
    } catch (error) {
      console.error("Error al obtener citas:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", cargarCitas);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetalleCita", { id: item.id })}
    >
      <View
        style={{
          padding: 10,
          marginBottom: 8,
          backgroundColor: "#f1f1f1",
          borderRadius: 5,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          Paciente: {item.paciente_nombre}
        </Text>
        <Text>Médico: {item.medico_nombre}</Text>
        <Text>Fecha: {item.fecha}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button
        title="Nueva Cita"
        onPress={() => navigation.navigate("CrearEditarCita")}
      />
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
