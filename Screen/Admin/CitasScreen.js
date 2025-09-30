import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { AdminService } from '../../service/adminService';
import Header from '../../src/components/Header';

export default function CitasScreen({ navigation }) {
  const [citas, setCitas] = useState([]);

  const cargar = async () => {
    try {
      const data = await AdminService.getAllCitas();
      setCitas(data || []);
    } catch (error) {
      console.error('Error al cargar citas:', error);
      Alert.alert('Error', 'No se pudieron cargar las citas');
    }
  };

  const eliminar = async (id) => {
    Alert.alert('¿Eliminar cita?', 'Esta acción no se puede deshacer', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await AdminService.deleteCita(id);
            Alert.alert('Éxito', 'Cita eliminada correctamente');
            cargar();
          } catch (error) {
            console.error('Error al eliminar cita:', error);
            Alert.alert('Error', 'No se pudo eliminar la cita');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    cargar();
  }, []);

  const formatFecha = (fecha) => {
    if (!fecha) return 'Sin fecha';
    try {
      // Asegurarse de que la fecha sea un objeto Date válido
      const f = new Date(fecha);
      if (isNaN(f.getTime())) {
        return 'Fecha inválida';
      }
      
      return f.toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return 'Error en fecha';
    }
  };

  const formatHora = (hora) => {
    if (!hora) return 'Sin hora';
    
    // Verificar si la hora tiene un formato válido (HH:MM o HH:MM:SS)
    const horaRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9]))?$/;
    if (!horaRegex.test(hora)) {
      try {
        // Intentar convertir a formato de 24 horas si es posible
        const date = new Date(`2000-01-01T${hora}`);
        if (!isNaN(date.getTime())) {
          return date.toLocaleTimeString('es-CO', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });
        }
      } catch {
        // Si falla, devolver la hora tal como está
        return hora;
      }
    }
    
    // Si tiene formato HH:MM:SS, extraer solo HH:MM
    return hora.length > 5 ? hora.substring(0, 5) : hora;
  };
  
  const getStatusColor = (estado) => {
    switch (estado.toUpperCase()) {
      case 'CONFIRMADA':
        return '#e3f2fd';
      case 'PENDIENTE':
        return '#fff9c4';
      case 'CANCELADA':
        return '#ffebee';
      case 'COMPLETADA':
        return '#e8f5e9';
      default:
        return '#f5f5f5';
    }
  };

  const renderItem = ({ item }) => {
    const paciente = item.paciente?.user?.name || item.paciente?.nombre || 'Paciente no disponible';
    const medico = item.medico?.user?.name || item.medico?.nombre || 'Médico no disponible';
    const fecha = formatFecha(item.fecha);
    const hora = formatHora(item.hora);
    const estado = item.estado || 'Sin estado';
    const motivo = item.motivo || 'No especificado';

    return (
      <View style={styles.card}>
        <Text style={styles.title}>📅 Cita #{item.id}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>👤 Paciente:</Text>
          <Text style={styles.infoValue}>{paciente}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>👨‍⚕️ Médico:</Text>
          <Text style={styles.infoValue}>{medico}</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateTimeLabel}>📆 Fecha:</Text>
            <Text style={styles.dateTimeValue}>{fecha}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.dateTimeLabel}>🕒 Hora:</Text>
            <Text style={[styles.dateTimeValue, styles.timeValue]}>{hora}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📝 Motivo:</Text>
          <Text style={styles.infoValue}>{motivo}</Text>
        </View>
        <View style={[styles.statusContainer, { backgroundColor: getStatusColor(estado) }]}>
          <Text style={styles.statusText}>{estado}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => eliminar(item.id)}>
          <Text style={styles.deleteText}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="📅 Citas" showBack={true} onBackPress={() => navigation.goBack()} />
      <FlatList
        data={citas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.empty}>No hay citas registradas</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { fontSize: 20, fontWeight: 'bold', margin: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 12,
    color: '#2c3e50'
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center'
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7f8c8d',
    width: 120
  },
  infoValue: {
    fontSize: 14,
    color: '#34495e',
    flex: 1
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between'
  },
  dateContainer: {
    flex: 1,
    marginRight: 8
  },
  timeContainer: {
    flex: 1
  },
  dateTimeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginBottom: 4
  },
  dateTimeValue: {
    fontSize: 14,
    color: '#34495e',
    backgroundColor: '#f5f5f5',
    padding: 6,
    borderRadius: 4
  },
  timeValue: {
    backgroundColor: '#e8f5e9',
    fontWeight: 'bold'
  },
  statusContainer: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginVertical: 8
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#2c3e50'
  },
  deleteButton: {
    marginTop: 12,
    backgroundColor: '#ffebee',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  deleteText: { 
    color: '#e74c3c', 
    fontWeight: 'bold' 
  },
  empty: { 
    textAlign: 'center', 
    marginTop: 40, 
    fontSize: 16, 
    color: '#999' 
  },
});
