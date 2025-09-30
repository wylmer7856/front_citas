import React, { useEffect, useState, useCallback } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity, 
  RefreshControl,
  Dimensions 
} from "react-native";
import { MedicoService } from "../../service/medicoService";
import Header from "../../src/components/Header";

const { width } = Dimensions.get('window');

export default function CitasMedicoScreen({ navigation }) {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCitas = useCallback(async () => {
    try {
      const res = await MedicoService.getCitasMedico();
      setCitas(res || []);
    } catch (err) { 
      console.error(err); 
      Alert.alert('Error','No se pudieron cargar las citas'); 
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadCitas();
  }, [loadCitas]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadCitas();
  }, [loadCitas]);

  const formatFecha = (fechaHora) => {
    if (!fechaHora) return 'No disponible';
    try {
      const fecha = new Date(fechaHora);
      return fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return fechaHora.split(' ')[0] || 'No disponible';
    }
  };

  const formatHora = (fechaHora) => {
    if (!fechaHora) return 'No disponible';
    try {
      const fecha = new Date(fechaHora);
      return fecha.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      const partes = fechaHora.split(' ');
      return partes.length > 1 ? partes[1].substring(0, 5) : 'No disponible';
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado?.toUpperCase()) {
      case 'PENDIENTE': return '#f39c12';
      case 'CONFIRMADA': return '#27ae60';
      case 'CANCELADA': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const handleConfirmarCita = async (id) => {
    try {
      setLoading(true);
      await MedicoService.confirmarCita(id);
      Alert.alert('Éxito', 'La cita ha sido confirmada');
      await loadCitas();
    } catch (error) {
      console.error('Error al confirmar cita:', error);
      Alert.alert('Error', 'No se pudo confirmar la cita');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const pacienteNombre = item.paciente?.user?.name || item.paciente?.nombre || 'Paciente no disponible';
    const pacienteEmail = item.paciente?.user?.email || 'Email no disponible';
    const fecha = formatFecha(item.fecha_hora || `${item.fecha} ${item.hora}`);
    const hora = formatHora(item.fecha_hora || `${item.fecha} ${item.hora}`);
    const motivo = item.motivo || 'No especificado';
    
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.fecha}>{fecha}</Text>
          <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(item.estado) }]}>
            <Text style={styles.estadoText}>{item.estado}</Text>
          </View>
        </View>
        
        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🕒 Hora:</Text>
            <Text style={styles.infoValue}>{hora}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>👤 Paciente:</Text>
            <Text style={styles.infoValue}>{pacienteNombre}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📧 Email:</Text>
            <Text style={styles.infoValue}>{pacienteEmail}</Text>
          </View>
          
          <View style={styles.motivoContainer}>
            <Text style={styles.motivoLabel}>📝 Motivo de la consulta:</Text>
            <Text style={styles.motivoText}>{motivo}</Text>
          </View>
          
          {item.estado === 'PENDIENTE' && (
            <TouchableOpacity
              style={styles.confirmarButton}
              onPress={() => {
                Alert.alert(
                  'Confirmar Cita',
                  '¿Estás seguro de que deseas confirmar esta cita?',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Confirmar', onPress: () => handleConfirmarCita(item.id) }
                  ]
                );
              }}
            >
              <Text style={styles.confirmarButtonText}>✓ Confirmar Cita</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Mis Citas" showBack={true} onBackPress={() => navigation.goBack()} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#3498db"/>
          <Text style={styles.loadingText}>Cargando citas...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Mis Citas" showBack={true} onBackPress={() => navigation.goBack()} />
      
      {citas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tienes citas programadas</Text>
        </View>
      ) : (
        <FlatList
          data={citas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:'#f8f9fa'
  },
  center: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d'
  },
  listContainer: {
    padding: 16
  },
  card: { 
    backgroundColor: "#fff", 
    borderRadius: 12, 
    marginBottom: 16, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden'
  },
  confirmarButton: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12
  },
  confirmarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  fecha: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  estadoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },
  estadoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  cardBody: {
    padding: 16
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8
  },
  infoLabel: {
    width: 100,
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500'
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600'
  },
  motivoContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8
  },
  motivoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7f8c8d',
    marginBottom: 4
  },
  motivoText: {
    fontSize: 14,
    color: '#2c3e50'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18,
    color: '#7f8c8d'
  }
});
