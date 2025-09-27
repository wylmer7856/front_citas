import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Alert, 
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { deleteUser } from '../../api/usuarios';
import { getPacientes } from '../../api/pacientes';
import { getMedicos } from '../../api/medicos';
import PerfilCard from '../../components/PerfilCard';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAll = async () => {
    try {
      setLoading(true);
      const pacientes = await getPacientes();
      const medicos = await getMedicos();
      const combinados = [...pacientes.data, ...medicos.data];
      setUsuarios(combinados);
      setFilteredUsuarios(combinados);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Filtro de búsqueda
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsuarios(usuarios);
    } else {
      const filtered = usuarios.filter(user => 
        user.user.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsuarios(filtered);
    }
  }, [searchQuery, usuarios]);

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser(id);
              Alert.alert('Éxito', 'Usuario eliminado correctamente');
              setUsuarios(prev => prev.filter(u => u.user.id !== id));
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el usuario');
            }
          }
        }
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAll();
    setRefreshing(false);
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      {/* Título con estadísticas */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Gestión de Usuarios</Text>
        <Text style={styles.subtitle}>
          {filteredUsuarios.length} usuario{filteredUsuarios.length !== 1 ? 's' : ''} encontrado{filteredUsuarios.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar usuarios..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Estadísticas rápidas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{usuarios.filter(u => u.user.tipo === 'paciente').length}</Text>
          <Text style={styles.statLabel}>Pacientes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{usuarios.filter(u => u.user.tipo === 'medico').length}</Text>
          <Text style={styles.statLabel}>Médicos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{usuarios.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>👥</Text>
      <Text style={styles.emptyTitle}>
        {searchQuery ? 'No se encontraron usuarios' : 'No hay usuarios'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery 
          ? 'Intenta con otros términos de búsqueda' 
          : 'Los usuarios aparecerán aquí cuando se registren'
        }
      </Text>
    </View>
  );

  if (loading) {
    return (
      <LinearGradient
        colors={['#3B82F6', '#60A5FA', '#DBEAFE', '#FFFFFF']}
        style={styles.loadingContainer}
      >
        <SafeAreaView style={styles.loadingContent}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>Cargando usuarios...</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#3B82F6', '#60A5FA', '#DBEAFE', '#FFFFFF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={filteredUsuarios}
          keyExtractor={item => item.user.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <PerfilCard 
                user={item.user} 
                onDelete={() => handleDelete(item.user.id)}
              />
            </View>
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="white"
              colors={['#3B82F6']}
            />
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 20,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardWrapper: {
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 15,
    overflow: 'hidden',
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevación para Android
    elevation: 3,
  },
  separator: {
    height: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Usuarios;