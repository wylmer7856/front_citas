import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"

export default function InicioScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.mainTitle}>EPS SaludTotal+</Text>
        <Text style={styles.tagline}>Excelencia en Atención Médica</Text>
        <Text style={styles.subtitle}>
          Transformamos la experiencia de salud con tecnología de vanguardia y atención personalizada para cada
          paciente.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate("Auth", { screen: "Login" })}
        >
          <Text style={styles.primaryButtonText}>Acceder a mi Portal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate("Auth", { screen: "Register" })}
        >
          <Text style={styles.secondaryButtonText}>Crear Nueva Cuenta</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>10+</Text>
          <Text style={styles.statLabel}>Pacientes Activos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1+</Text>
          <Text style={styles.statLabel}>Especialistas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>24/7</Text>
          <Text style={styles.statLabel}>Atención</Text>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Nuestra Misión</Text>
        <Text style={styles.sectionText}>
          En EPS SaludTotal+ nos comprometemos a brindar servicios de salud integrales y de alta calidad, utilizando
          tecnología innovadora para garantizar una experiencia excepcional en cada interacción con nuestros pacientes y
          sus familias.
        </Text>
      </View>

      {/* Services Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Servicios Especializados</Text>
        <View style={styles.servicesList}>
          <View style={styles.serviceItem}>
            <Text style={styles.serviceIcon}>🏥</Text>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>Consulta Médica General</Text>
              <Text style={styles.serviceDescription}>Atención primaria con médicos certificados</Text>
            </View>
          </View>

          <View style={styles.serviceItem}>
            <Text style={styles.serviceIcon}>👨‍⚕️</Text>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>Especialidades Médicas</Text>
              <Text style={styles.serviceDescription}>Más de 30 especialidades disponibles</Text>
            </View>
          </View>

          <View style={styles.serviceItem}>
            <Text style={styles.serviceIcon}>📱</Text>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>Telemedicina</Text>
              <Text style={styles.serviceDescription}>Consultas virtuales desde casa</Text>
            </View>
          </View>

          <View style={styles.serviceItem}>
            <Text style={styles.serviceIcon}>📋</Text>
            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>Historial Clínico Digital</Text>
              <Text style={styles.serviceDescription}>Acceso completo a tu información médica</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Benefits Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>¿Por qué elegir SaludTotal+?</Text>
        <View style={styles.benefitsList}>
          <Text style={styles.benefitItem}>✨ Red médica de excelencia con profesionales certificados</Text>
          <Text style={styles.benefitItem}>⚡ Citas médicas programadas en menos de 24 horas</Text>
          <Text style={styles.benefitItem}>🔒 Seguridad y privacidad garantizada de tus datos</Text>
          <Text style={styles.benefitItem}>💊 Cobertura integral en medicamentos y tratamientos</Text>
          <Text style={styles.benefitItem}>🌟 Atención personalizada y seguimiento continuo</Text>
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>¿Necesitas Ayuda?</Text>
        <Text style={styles.contactText}>
          Nuestro equipo de atención al cliente está disponible las 24 horas para resolver tus dudas.
        </Text>
        <Text style={styles.contactPhone}>📞 Línea de Atención: 01-8000-SALUD</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FAFBFC",
  },

  // Header Section
  headerSection: {
    backgroundColor: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: "center",
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0226deff",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3c508fff",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#000000ff",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
  },

  // Action Buttons
  actionContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 16,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: "#1E40AF",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#1E40AF",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    color: "#1E40AF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // Stats Section
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E40AF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textAlign: "center",
  },

  // Section Cards
  sectionCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  sectionText: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
    textAlign: "justify",
  },

  // Services
  servicesList: {
    gap: 20,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  serviceIcon: {
    fontSize: 24,
    marginTop: 2,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },

  // Benefits
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    paddingLeft: 8,
  },

  // Contact Card
  contactCard: {
    backgroundColor: "#F8FAFC",
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
  contactPhone: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
  },
})
