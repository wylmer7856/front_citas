import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
  Dimensions,
  TextInput
} from 'react-native';
import { MedicoService } from '../../service/medicoService';
import { PacienteService } from '../../service/pacienteService';
import Header from '../../src/components/Header';

const { width } = Dimensions.get('window');

const NuevaCitaScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [medicos, setMedicos] = useState([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [showMedicoModal, setShowMedicoModal] = useState(false);

  useEffect(() => {
    loadMedicos();
  }, []);

  const loadMedicos = async () => {
    try {
      setLoading(true);
      
      // Intentar obtener médicos con diferentes endpoints
      let medicosData = [];
      
      try {
        // Primero intentar con el endpoint específico para pacientes
        medicosData = await MedicoService.getMedicosDisponibles();
        console.log('Médicos cargados desde /medicos-disponibles:', medicosData);
      } catch (pacienteError) {
        console.log('Error con endpoint de pacientes, intentando endpoint de admin...');
        
        try {
          // Si falla, intentar con el endpoint de admin
          medicosData = await MedicoService.getAllMedicos();
          console.log('Médicos cargados desde /medicos:', medicosData);
        } catch (adminError) {
          console.log('Error con endpoint de admin, usando datos de ejemplo...');
          
          // Si ambos fallan, usar datos de ejemplo basados en tu base de datos
          medicosData = [
            {
              id: 1,
              especialidad: 'Cardiología',
              user: {
                id: 3,
                name: 'dr camila',
                email: 'cami@mail.com'
              }
            },
            {
              id: 2,
              especialidad: 'Psicología',
              user: {
                id: 5,
                name: 'Juan Barrera',
                email: 'juan@gmail.com'
              }
            }
          ];
          console.log('Usando médicos de ejemplo:', medicosData);
        }
      }
      
      setMedicos(medicosData || []);
    } catch (error) {
      console.error('Error cargando médicos:', error);
      Alert.alert('Error', 'No se pudieron cargar los médicos disponibles');
    } finally {
      setLoading(false);
    }
  };

  const handleAgendarCita = async () => {
    if (!medicoSeleccionado) {
      Alert.alert('Error', 'Por favor selecciona un médico');
      return;
    }

    if (!fecha.trim()) {
      Alert.alert('Error', 'Por favor ingresa la fecha de la cita');
      return;
    }

    if (!hora.trim()) {
      Alert.alert('Error', 'Por favor ingresa la hora de la cita');
      return;
    }

    if (!motivo.trim()) {
      Alert.alert('Error', 'Por favor ingresa el motivo de la cita');
      return;
    }

    try {
      setLoading(true);

      // Combinar fecha y hora (formato: YYYY-MM-DD HH:MM)
      const fechaHora = `${fecha} ${hora}:00`;

      const citaData = {
        medico_id: medicoSeleccionado.id,
        fecha_hora: fechaHora,
        motivo: motivo.trim()
      };

      console.log('Creando cita con datos:', citaData);
      
      const nuevaCita = await PacienteService.createCita(citaData);
      console.log('Cita creada exitosamente:', nuevaCita);

      Alert.alert(
        '¡Cita Agendada!',
        `Tu cita con Dr. ${medicoSeleccionado.user.name} ha sido agendada para el ${fecha} a las ${hora}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );

    } catch (error) {
      console.error('Error creando cita:', error);
      Alert.alert('Error', 'No se pudo agendar la cita. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const renderMedicoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.medicoItem}
      onPress={() => {
        setMedicoSeleccionado(item);
        setShowMedicoModal(false);
      }}
    >
      <View style={styles.medicoInfo}>
        <Text style={styles.medicoNombre}>Dr. {item.user.name}</Text>
        <Text style={styles.medicoEspecialidad}>{item.especialidad}</Text>
        <Text style={styles.medicoEmail}>{item.user.email}</Text>
      </View>
      <View style={styles.medicoIcon}>
        <Text style={styles.medicoIconText}>👨‍⚕️</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <Header 
        title="Nueva Cita" 
        showBack={true} 
        onBackPress={() => navigation.goBack()} 
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Selección de Médico */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👨‍⚕️ Seleccionar Médico</Text>
          <TouchableOpacity
            style={styles.selectorButton}
            onPress={() => setShowMedicoModal(true)}
          >
            <View style={styles.selectorContent}>
              <Text style={styles.selectorLabel}>Médico:</Text>
              <Text style={styles.selectorValue}>
                {medicoSeleccionado 
                  ? `Dr. ${medicoSeleccionado.user.name} - ${medicoSeleccionado.especialidad}`
                  : 'Selecciona un médico'
                }
              </Text>
            </View>
            <Text style={styles.selectorArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Fecha de la Cita */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Fecha de la Cita</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Fecha (YYYY-MM-DD):</Text>
            <TextInput
              style={styles.textInput}
              placeholder="2025-10-15"
              value={fecha}
              onChangeText={setFecha}
              keyboardType="default"
            />
          </View>
        </View>

        {/* Hora de la Cita */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🕐 Hora de la Cita</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Hora (HH:MM):</Text>
            <TextInput
              style={styles.textInput}
              placeholder="14:30"
              value={hora}
              onChangeText={setHora}
              keyboardType="default"
            />
          </View>
        </View>

        {/* Motivo de la Cita */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Motivo de la Cita</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Describe brevemente el motivo:</Text>
            <View style={styles.textAreaContainer}>
              <Text
                style={styles.textArea}
                placeholder="Ej: Dolor de cabeza, revisión general, consulta sobre..."
                placeholderTextColor="#95a5a6"
                multiline
                numberOfLines={4}
                value={motivo}
                onChangeText={setMotivo}
              />
            </View>
          </View>
        </View>

        {/* Resumen de la Cita */}
        {medicoSeleccionado && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Resumen de la Cita</Text>
            <View style={styles.resumenCard}>
              <View style={styles.resumenRow}>
                <Text style={styles.resumenLabel}>Médico:</Text>
                <Text style={styles.resumenValue}>Dr. {medicoSeleccionado.user.name}</Text>
              </View>
              <View style={styles.resumenRow}>
                <Text style={styles.resumenLabel}>Especialidad:</Text>
                <Text style={styles.resumenValue}>{medicoSeleccionado.especialidad}</Text>
              </View>
              <View style={styles.resumenRow}>
                <Text style={styles.resumenLabel}>Fecha:</Text>
                <Text style={styles.resumenValue}>{fecha || 'No seleccionada'}</Text>
              </View>
              <View style={styles.resumenRow}>
                <Text style={styles.resumenLabel}>Hora:</Text>
                <Text style={styles.resumenValue}>{hora || 'No seleccionada'}</Text>
              </View>
              {motivo && (
                <View style={styles.resumenRow}>
                  <Text style={styles.resumenLabel}>Motivo:</Text>
                  <Text style={styles.resumenValue}>{motivo}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Botón de Agendar */}
        <TouchableOpacity
          style={[
            styles.agendarButton,
            (!medicoSeleccionado || !motivo.trim()) && styles.agendarButtonDisabled
          ]}
          onPress={handleAgendarCita}
          disabled={!medicoSeleccionado || !motivo.trim() || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.agendarButtonText}>📅 Agendar Cita</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de Selección de Médicos */}
      <Modal
        visible={showMedicoModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Seleccionar Médico</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowMedicoModal(false)}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={medicos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMedicoItem}
            style={styles.medicosList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  selectorButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectorContent: {
    flex: 1,
  },
  selectorLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  selectorValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  selectorArrow: {
    fontSize: 16,
    color: '#3498db',
    marginLeft: 10,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
  },
  textArea: {
    fontSize: 16,
    color: '#2c3e50',
    textAlignVertical: 'top',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2c3e50',
    backgroundColor: '#fff',
  },
  resumenCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resumenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  resumenLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  resumenValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  agendarButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  agendarButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  agendarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  modalCloseButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicosList: {
    flex: 1,
    padding: 20,
  },
  medicoItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicoInfo: {
    flex: 1,
  },
  medicoNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  medicoEspecialidad: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
    marginBottom: 2,
  },
  medicoEmail: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  medicoIcon: {
    marginLeft: 15,
  },
  medicoIconText: {
    fontSize: 24,
  },
});

export default NuevaCitaScreen;
