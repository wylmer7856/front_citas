// src/screens/paciente/CitasPacienteScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  RefreshControl,
  Dimensions
} from "react-native";
import { PacienteService } from "../../service/pacienteService";
import Header from "../../src/components/Header";

const { width } = Dimensions.get('window');

const CitasPacienteScreen = ({ navigation }) => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCitas = async () => {
    try {
      const data = await PacienteService.getCitasPaciente();
      console.log('Citas cargadas:', data);
      
      // Asegurarse de que citas sea un array
      const citasArray = Array.isArray(data) ? data : 
                        (data && data.data && Array.isArray(data.data)) ? data.data : [];
      
      // Ordenar citas por fecha (más recientes primero)
      citasArray.sort((a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora));
      
      setCitas(citasArray);
    } catch (error) {
      console.error("Error cargando citas:", error);
      Alert.alert("Error", "No se pudieron cargar las citas. Por favor, intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCitas();
    setRefreshing(false);
  };

  const handleCancelarCita = async (citaId) => {
    Alert.alert(
      'Cancelar Cita',
      '¿Estás seguro de que quieres cancelar esta cita?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await PacienteService.cancelarCita(citaId);
              Alert.alert('Éxito', 'Cita cancelada correctamente');
              await loadCitas(); // Recargar la lista
            } catch (error) {
              console.error('Error cancelando cita:', error);
              Alert.alert('Error', 'No se pudo cancelar la cita. Por favor, intenta de nuevo más tarde.');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    loadCitas();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'PENDIENTE': return '#f39c12';
      case 'CONFIRMADA': return '#27ae60';
      case 'CANCELADA': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getEstadoText = (estado) => {
    switch (estado) {
      case 'PENDIENTE': return 'Pendiente';
      case 'CONFIRMADA': return 'Confirmada';
      case 'CANCELADA': return 'Cancelada';
      default: return estado;
    }
  };

  const renderCitaItem = ({ item }) => (
    <View style={styles.citaCard}>
      <View style={styles.citaHeader}>
        <View style={styles.citaInfo}>
          <Text style={styles.citaFecha}>{formatDate(item.fecha_hora)}</Text>
          <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(item.estado) }]}>
            <Text style={styles.estadoText}>{getEstadoText(item.estado)}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.citaContent}>
        {item.motivo && (
          <View style={styles.citaRow}>
            <Text style={styles.citaLabel}>📝 Motivo:</Text>
            <Text style={styles.citaValue}>{item.motivo}</Text>
          </View>
        )}
        
        {item.medico && (
          <View style={styles.citaRow}>
            <Text style={styles.citaLabel}>👨‍⚕️ Médico:</Text>
            <Text style={styles.citaValue}>Dr. {item.medico.user?.name || 'N/A'}</Text>
          </View>
        )}
        
        {item.medico?.especialidad && (
          <View style={styles.citaRow}>
            <Text style={styles.citaLabel}>🏥 Especialidad:</Text>
            <Text style={styles.citaValue}>{item.medico.especialidad}</Text>
          </View>
        )}
      </View>

      {item.estado === 'PENDIENTE' && (
        <View style={styles.citaActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelarCita(item.id)}
          >
            <Text style={styles.cancelButtonText}>❌ Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Mis Citas" showBack={true} onBackPress={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
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
          <Text style={styles.emptyIcon}>📅</Text>
          <Text style={styles.emptyTitle}>No tienes citas registradas</Text>
          <Text style={styles.emptySubtitle}>
            Presiona "Nueva Cita" en el dashboard para agendar tu primera cita
          </Text>
          <TouchableOpacity
            style={styles.nuevaCitaButton}
            onPress={() => navigation.navigate('NuevaCita')}
          >
            <Text style={styles.nuevaCitaButtonText}>➕ Agendar Nueva Cita</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={citas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCitaItem}
          style={styles.citasList}
          contentContainerStyle={styles.citasListContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  nuevaCitaButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  nuevaCitaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  citasList: {
    flex: 1,
  },
  citasListContent: {
    padding: 20,
  },
  citaCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  citaHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  citaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  citaFecha: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  estadoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  estadoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  citaContent: {
    padding: 15,
  },
  citaRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  citaLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
    width: 100,
  },
  citaValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600',
    flex: 1,
  },
  citaActions: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CitasPacienteScreen;
