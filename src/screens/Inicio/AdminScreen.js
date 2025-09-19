import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default function AdminScreen({ navigation }) {
  const opciones = [
    { label: "Usuarios", screen: "ListarUsuarios", icon: "👥", description: "Gestionar usuarios del sistema" },
    {
      label: "Especialidades",
      screen: "ListarEspecialidades",
      icon: "🏥",
      description: "Administrar especialidades médicas",
    },
    {
      label: "Médico-Especialidad",
      screen: "ListarMedicoEspecialidad",
      icon: "👨‍⚕️",
      description: "Asignar especialidades a médicos",
    },
    { label: "Citas", screen: "ListarCitas", icon: "📅", description: "Supervisar citas programadas" },
    { label: "Historial", screen: "ListarHistorial", icon: "📋", description: "Revisar historial médico" },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bienvenido</Text>
        <Text style={styles.heading}>Panel Administrativo</Text>
        <Text style={styles.subtitle}>Gestiona todos los aspectos del sistema EPS</Text>
      </View>

      <View style={styles.optionsContainer}>
        {opciones.map((opcion, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8FAFF" }]}
            onPress={() => navigation.navigate(opcion.screen)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>{opcion.icon}</Text>
              <View style={styles.cardBadge}>
                <Text style={styles.badgeText}>Admin</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>{opcion.label}</Text>
            <Text style={styles.cardDescription}>{opcion.description}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.accessText}>Acceso completo</Text>
              <Text style={styles.arrowIcon}>→</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>SaludTotal+ Admin Dashboard</Text>
        <Text style={styles.versionText}>Versión 2.1.0</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  header: {
    backgroundColor: "#1E40AF",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#1E40AF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: "#93C5FD",
    fontWeight: "500",
    marginBottom: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#DBEAFE",
    fontWeight: "400",
  },
  optionsContainer: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardBadge: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 18,
    color: "#1F2937",
    fontWeight: "bold",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  accessText: {
    fontSize: 12,
    color: "#059669",
    fontWeight: "600",
  },
  arrowIcon: {
    fontSize: 16,
    color: "#1E40AF",
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
})
