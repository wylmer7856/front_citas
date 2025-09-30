import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { ApiService } from "../../service/ApiService";
import Header from "../../src/components/Header";
import { AuthContext } from "../../src/context/AuthContext";

const { width } = Dimensions.get('window');

export default function Dashboard({ navigation }) {
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({ totalCitas: 0, citasHoy: 0, pacientesAtendidos: 0 });
  const [citas, setCitas] = useState([]);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ApiService.get('/Mcitas');
      setCitas(data || []);

      const now = new Date();
      const hoy = now.toISOString().slice(0, 10);
      const totalCitas = data?.length || 0;
      const citasHoy = (data || []).filter(c => (c.fecha_hora || '').slice(0,10) === hoy).length;
      const pacientesAtendidos = (data || []).filter(c => c.estado === 'CONFIRMADA').length;
      setStats({ totalCitas, citasHoy, pacientesAtendidos });
    } catch (e) {
      console.error('Error cargando dashboard médico:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    return d.toLocaleDateString('es-ES', { weekday:'long', day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' });
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'PENDIENTE': return '#f39c12';
      case 'CONFIRMADA': return '#27ae60';
      case 'CANCELADA': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Panel del Médico" />
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Cargando dashboard...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Panel del Médico" />

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Estadísticas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Resumen</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}><Text style={styles.statNumber}>{stats.totalCitas}</Text><Text style={styles.statLabel}>Total</Text></View>
            <View style={styles.statCard}><Text style={[styles.statNumber,{color:'#f39c12'}]}>{stats.citasHoy}</Text><Text style={styles.statLabel}>Hoy</Text></View>
            <View style={styles.statCard}><Text style={[styles.statNumber,{color:'#27ae60'}]}>{stats.pacientesAtendidos}</Text><Text style={styles.statLabel}>Atendidos</Text></View>
          </View>
        </View>

        {/* Próximas Citas */}
        {citas.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Próximas Citas</Text>
            {(citas.slice(0,3)).map((c,i) => (
              <View key={i} style={styles.citaCard}>
                <View style={styles.citaHeader}>
                  <Text style={styles.citaFecha}>{formatDate(c.fecha_hora)}</Text>
                  <View style={[styles.estadoBadge,{backgroundColor:getEstadoColor(c.estado)}]}>
                    <Text style={styles.estadoText}>{c.estado}</Text>
                  </View>
                </View>
                <View style={styles.citaBody}>
                  {c.paciente?.user?.name && (
                    <Text style={styles.citaLine}>🧑 Paciente: {c.paciente.user.name}</Text>
                  )}
                  {c.motivo && (
                    <Text style={styles.citaMotivo}>📝 {c.motivo}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Acciones Rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Acciones Rápidas</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.actionCard,{backgroundColor:'#3498db'}]} onPress={() => navigation.navigate('CitasMedico')}>
              <Text style={styles.actionIcon}>📋</Text>
              <Text style={styles.actionText}>Mis Citas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard,{backgroundColor:'#9b59b6'}]} onPress={() => navigation.navigate('Horarios')}>
              <Text style={styles.actionIcon}>⏰</Text>
              <Text style={styles.actionText}>Mis Horarios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard,{backgroundColor:'#1abc9c'}]} onPress={() => navigation.navigate('PerfilMedico')}>
              <Text style={styles.actionIcon}>👤</Text>
              <Text style={styles.actionText}>Mi Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Botón de cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>🚪 Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#f8f9fa' },
  content:{ padding:20 },
  loadingBox:{ flex:1, alignItems:'center', justifyContent:'center' },
  loadingText:{ marginTop:10, color:'#7f8c8d' },
  section:{ marginBottom:20 },
  sectionTitle:{ fontSize:18, fontWeight:'bold', color:'#2c3e50', marginBottom:12 },
  statsRow:{ flexDirection:'row', justifyContent:'space-between' },
  statCard:{ width:(width-60)/3, backgroundColor:'#fff', borderRadius:12, padding:14, alignItems:'center', elevation:3 },
  statNumber:{ fontSize:22, fontWeight:'bold', color:'#2c3e50' },
  statLabel:{ fontSize:12, color:'#7f8c8d' },
  citaCard:{ backgroundColor:'#fff', borderRadius:12, padding:14, marginBottom:10, elevation:3 },
  citaHeader:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:6 },
  citaFecha:{ fontSize:14, fontWeight:'600', color:'#2c3e50' },
  estadoBadge:{ paddingHorizontal:10, paddingVertical:4, borderRadius:12 },
  estadoText:{ fontSize:10, fontWeight:'bold', color:'#fff' },
  citaBody:{},
  citaLine:{ fontSize:13, color:'#2c3e50', marginBottom:2 },
  citaMotivo:{ fontSize:12, color:'#7f8c8d' },
  actionsRow:{ flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between' },
  actionCard:{ width:(width-60)/3, borderRadius:12, paddingVertical:18, alignItems:'center', marginBottom:10, elevation:3 },
  actionIcon:{ fontSize:22, color:'#fff', marginBottom:6 },
  actionText:{ fontSize:12, color:'#fff', fontWeight:'600', textAlign:'center' },
  logoutButton: { 
    backgroundColor: '#e74c3c', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000', 
    shadowOffset: {width: 0, height: 1}, 
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
    elevation: 3 
  },
  logoutText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});
