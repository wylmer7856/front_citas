// src/screens/paciente/Dashboard.js
import React, { useContext, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  RefreshControl,
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { AuthContext } from '../../src/context/AuthContext';
import { PacienteService } from '../../service/pacienteService';

const { width } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pacienteData, setPacienteData] = useState(null);
  const [citasData, setCitasData] = useState([]);
  const [stats, setStats] = useState({
    totalCitas: 0,
    citasPendientes: 0,
    citasConfirmadas: 0,
    citasCanceladas: 0
  });

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      console.log('Cargando datos del dashboard para usuario:', user);
      
      // Usar datos del paciente que ya tenemos del login
      if (user?.paciente) {
        console.log('Usando datos del paciente del login:', user.paciente);
        setPacienteData({
          id: user.paciente.id,
          telefono: user.paciente.telefono,
          fecha_nacimiento: user.paciente.fecha_nacimiento,
          user_id: user.paciente.user_id
        });
      } else {
        console.log('No hay datos de paciente disponibles');
        setPacienteData({
          telefono: 'No registrado',
          fecha_nacimiento: null
        });
      }

      // Obtener citas del paciente
      try {
        console.log('Intentando obtener citas del paciente...');
        const citas = await PacienteService.getCitasPaciente();
        console.log('Citas obtenidas:', citas);
        
        // Asegurarse de que citas sea un array
        const citasArray = Array.isArray(citas) ? citas : 
                          (citas && citas.data && Array.isArray(citas.data)) ? citas.data : [];
        
        setCitasData(citasArray);
        
        // Calcular estadísticas
        const total = citasArray.length || 0;
        const pendientes = citasArray.filter(c => c.estado === 'PENDIENTE').length || 0;
        const confirmadas = citasArray.filter(c => c.estado === 'CONFIRMADA').length || 0;
        const canceladas = citasArray.filter(c => c.estado === 'CANCELADA').length || 0;
        
        setStats({
          totalCitas: total,
          citasPendientes: pendientes,
          citasConfirmadas: confirmadas,
          citasCanceladas: canceladas
        });
      } catch (error) {
        console.error('No se pudieron obtener las citas:', error);
        Alert.alert(
          'Error',
          'No se pudieron cargar tus citas. Por favor, intenta de nuevo más tarde.',
          [{ text: 'OK' }]
        );
        // Usar datos vacíos si no hay citas
        setCitasData([]);
        setStats({
          totalCitas: 0,
          citasPendientes: 0,
          citasConfirmadas: 0,
          citasCanceladas: 0
        });
      }
    } catch (error) {
      console.error('Error cargando dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Cargando dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header con saludo */}
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>¡Hola!</Text>
          <Text style={styles.userName}>{user?.name || user?.email}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Estadísticas rápidas */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>📊 Resumen de Citas</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalCitas}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#f39c12' }]}>{stats.citasPendientes}</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#27ae60' }]}>{stats.citasConfirmadas}</Text>
            <Text style={styles.statLabel}>Confirmadas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#e74c3c' }]}>{stats.citasCanceladas}</Text>
            <Text style={styles.statLabel}>Canceladas</Text>
          </View>
        </View>
      </View>

      {/* Próximas citas */}
      {citasData.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Próximas Citas</Text>
          {citasData.slice(0, 3).map((cita, index) => (
            <View key={index} style={styles.citaCard}>
              <View style={styles.citaHeader}>
                <Text style={styles.citaDate}>{formatDate(cita.fecha_hora)}</Text>
                <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(cita.estado) }]}>
                  <Text style={styles.estadoText}>{getEstadoText(cita.estado)}</Text>
                </View>
              </View>
              {cita.motivo && (
                <Text style={styles.citaMotivo}>Motivo: {cita.motivo}</Text>
              )}
              {cita.medico && (
                <Text style={styles.citaMedico}>Dr. {cita.medico.name}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Acciones rápidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 Acciones Rápidas</Text>
        
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#3498db' }]}
            onPress={() => navigation.navigate('CitasPaciente')}
          >
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionText}>Mis Citas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#9b59b6' }]}
            onPress={() => navigation.navigate('PerfilPaciente')}
          >
            <Text style={styles.actionIcon}>👤</Text>
            <Text style={styles.actionText}>Mi Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#e67e22' }]}
            onPress={() => navigation.navigate('NuevaCita')}
          >
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionText}>Nueva Cita</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#1abc9c' }]}
            onPress={() => Alert.alert('Próximamente', 'Historial médico en desarrollo')}
          >
            <Text style={styles.actionIcon}>📄</Text>
            <Text style={styles.actionText}>Historial</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Información del paciente */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ Información Personal</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Teléfono:</Text>
            <Text style={styles.infoValue}>
              {user?.paciente?.telefono || pacienteData?.telefono || 'No registrado'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fecha de Nacimiento:</Text>
            <Text style={styles.infoValue}>
              {user?.paciente?.fecha_nacimiento || pacienteData?.fecha_nacimiento ? 
                new Date(user?.paciente?.fecha_nacimiento || pacienteData?.fecha_nacimiento).toLocaleDateString('es-ES') : 
                'No registrada'
              }
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID Paciente:</Text>
            <Text style={styles.infoValue}>
              {user?.paciente?.id || 'N/A'}
            </Text>
          </View>
        </View>
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>🚪 Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#95a5a6',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    margin: 20,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  statsContainer: {
    margin: 20,
    marginBottom: 0,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  citaCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  citaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  citaDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  estadoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  citaMotivo: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  citaMedico: {
    fontSize: 13,
    color: '#3498db',
    fontWeight: '500',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  infoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600',
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
