import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { deleteUsuario } from "../../api/usuariosService";

export default function DetalleUsuario({ route, navigation }) {
  const { usuario } = route.params;

  const handleEliminar = async () => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Seguro deseas eliminar a ${usuario.nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteUsuario(usuario.id);
              Alert.alert("✅ Eliminado", "Usuario eliminado correctamente");
              navigation.goBack();
            } catch (error) {
              Alert.alert("❌ Error", "No se pudo eliminar el usuario");
              console.error(error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detalle de Usuario</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{usuario.nombre} {usuario.apellido}</Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{usuario.email}</Text>

        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{usuario.telefono}</Text>

        <Text style={styles.label}>Rol:</Text>
        <Text style={styles.value}>{usuario.rol}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate("CrearEditarUsuario", { usuario })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleEliminar}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F9FD" },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1089D3",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 30,
  },
  label: { fontWeight: "bold", fontSize: 14, marginTop: 10, color: "#444" },
  value: { fontSize: 16, color: "#222" },
  buttons: { flexDirection: "row", justifyContent: "space-between" },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  editButton: { backgroundColor: "#1089D3" },
  deleteButton: { backgroundColor: "#D9534F" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
