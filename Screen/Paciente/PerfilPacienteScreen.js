// src/screens/paciente/PerfilPacienteScreen.js
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { PacienteService } from "../../service/pacienteService";
import Header from "../../src/components/Header";
import { AuthContext } from "../../src/context/AuthContext";

const PerfilPacienteScreen = ({ navigation }) => {
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const loadPerfil = async () => {
    try {
      // Usar el id del paciente (no el id del usuario)
      const pacienteId = user?.paciente?.id;
      if (!pacienteId) {
        setPaciente({
          user: { name: user?.name, email: user?.email },
          telefono: user?.paciente?.telefono || "No registrado",
          fecha_nacimiento: user?.paciente?.fecha_nacimiento || null,
        });
        setLoading(false);
        return;
      }

      const data = await PacienteService.getPacienteById(pacienteId);
      setPaciente(data);
    } catch (error) {
      console.error("Error cargando perfil paciente:", error);
      Alert.alert("Error", "No se pudo cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPerfil();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}> 
        <Header title="Mi Perfil" showBack={true} onBackPress={() => navigation.goBack()} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.center}>
        <Text>No se encontró información del paciente.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Mi Perfil" showBack={true} onBackPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Información Personal</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>{paciente.user?.name || user?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{paciente.user?.email || user?.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Teléfono</Text>
            <Text style={styles.value}>{paciente.telefono || 'No registrado'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de nacimiento</Text>
            <Text style={styles.value}>
              {paciente.fecha_nacimiento ? new Date(paciente.fecha_nacimiento).toLocaleDateString('es-ES') : 'No registrada'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={loadPerfil}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  content: { padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 12, color: '#2c3e50' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  label: { color: '#7f8c8d', fontSize: 14, fontWeight: '500', width: 140 },
  value: { fontSize: 14, color: '#2c3e50', fontWeight: '600', flex: 1, textAlign: 'right' },
  button: { marginTop: 16, backgroundColor: '#3498db', padding: 14, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default PerfilPacienteScreen;
