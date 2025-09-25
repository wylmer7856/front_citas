// src/screens/auth/InicioScreen.js
import React from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'; // npm install expo-linear-gradient
import Button from "../../components/common/Button";

export default function InicioScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#4A90E2', '#357ABD', '#2E5984']}
        style={styles.gradient}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🏥</Text>
            <Text style={styles.logoText}>MediCare</Text>
            <Text style={styles.logoSubtext}>Proyecto Médico</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>
              Bienvenido a tu plataforma de salud
            </Text>
            <Text style={styles.welcomeSubtitle}>
              Accede a tu información médica de forma segura y confiable
            </Text>
          </View>

          {/* Features Section */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📋</Text>
              <Text style={styles.featureText}>Historial Médico</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>👨‍⚕️</Text>
              <Text style={styles.featureText}>Consultas Online</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💊</Text>
              <Text style={styles.featureText}>Recordatorios</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button 
              title="Iniciar Sesión" 
              onPress={() => navigation.navigate("Login")}
              style={styles.loginButton}
              textStyle={styles.loginButtonText}
            />
            <Button 
              title="Registrarse" 
              onPress={() => navigation.navigate("Register")}
              style={styles.registerButton}
              textStyle={styles.registerButtonText}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Tu información médica está protegida con los más altos estándares de seguridad
            </Text>
            <View style={styles.securityBadges}>
              <Text style={styles.badge}>🔒 Cifrado SSL</Text>
              <Text style={styles.badge}>🛡️ HIPAA</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
    minHeight: '100%',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  logoSubtext: {
    fontSize: 16,
    color: '#E8F4FD',
    fontWeight: '300',
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 36,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#E8F4FD',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '300',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonText: {
    color: '#2E5984',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 15,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#E8F4FD',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  securityBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  badge: {
    fontSize: 11,
    color: '#E8F4FD',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginHorizontal: 5,
    fontWeight: '500',
  },
});