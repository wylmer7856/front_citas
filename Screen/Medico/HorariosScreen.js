import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { HorariosService } from "../../service/horariosService";
import Header from "../../src/components/Header";

export default function HorariosScreen({ navigation }) {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [nuevoHorario, setNuevoHorario] = useState({
    dia_semana: "LUNES",
    hora_inicio: "",
    hora_fin: "",
  });

  useEffect(() => {
    fetchHorarios();
  }, []);

  const fetchHorarios = async () => {
    try {
      setLoading(true);
      const res = await HorariosService.getAllHorarios();
      setHorarios(res || []);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "No se pudieron cargar los horarios");
    } finally {
      setLoading(false);
    }
  };

  const validar = () => {
    const { dia_semana, hora_inicio, hora_fin } = nuevoHorario;
    const validDia = [
      "LUNES",
      "MARTES",
      "MIERCOLES",
      "JUEVES",
      "VIERNES",
      "SABADO",
    ].includes(dia_semana);
    const hhmm = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!validDia) return "Día inválido";
    if (!hhmm.test(hora_inicio)) return "Hora inicio inválida (HH:mm)";
    if (!hhmm.test(hora_fin)) return "Hora fin inválida (HH:mm)";
    if (hora_inicio >= hora_fin)
      return "La hora de inicio debe ser menor a la de fin";
    return null;
  };

  const agregarHorario = async () => {
    const err = validar();
    if (err) {
      Alert.alert("Validación", err);
      return;
    }
    try {
      setSaving(true);
      await HorariosService.createHorario(nuevoHorario);
      setNuevoHorario({ dia_semana: "LUNES", hora_inicio: "", hora_fin: "" });
      await fetchHorarios();
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "No se pudo crear el horario");
    } finally {
      setSaving(false);
    }
  };

  const eliminarHorario = async (id) => {
    try {
      await HorariosService.deleteHorario(id);
      await fetchHorarios();
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "No se pudo eliminar el horario");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header
          title="Mis Horarios"
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Mis Horarios"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={horarios}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.card}>
              <Text style={styles.label}>Día de la semana (LUNES..SABADO)</Text>
              <TextInput
                style={styles.input}
                value={nuevoHorario.dia_semana}
                onChangeText={(t) =>
                  setNuevoHorario({
                    ...nuevoHorario,
                    dia_semana: t.toUpperCase(),
                  })
                }
              />

              <Text style={styles.label}>Hora inicio (HH:mm)</Text>
              <TextInput
                style={styles.input}
                placeholder="08:00"
                value={nuevoHorario.hora_inicio}
                onChangeText={(t) =>
                  setNuevoHorario({ ...nuevoHorario, hora_inicio: t })
                }
              />

              <Text style={styles.label}>Hora fin (HH:mm)</Text>
              <TextInput
                style={styles.input}
                placeholder="12:00"
                value={nuevoHorario.hora_fin}
                onChangeText={(t) =>
                  setNuevoHorario({ ...nuevoHorario, hora_fin: t })
                }
              />

              <TouchableOpacity
                style={[styles.button, saving && { opacity: 0.7 }]}
                onPress={agregarHorario}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Agregar Horario</Text>
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>Horarios Creados</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.dia_semana} · {item.hora_inicio} - {item.hora_fin}
            </Text>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => eliminarHorario(item.id)}
            >
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  content: { padding: 20 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    marginBottom: 16,
  },
  label: { color: "#7f8c8d", marginBottom: 6, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ecf0f1",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#2c3e50",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  itemText: { color: "#2c3e50", fontWeight: "600" },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
});
