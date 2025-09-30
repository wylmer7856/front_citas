import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../src/context/ThemeContext';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <LinearGradient
        colors={isDarkMode ? ['#121212', '#1E1E1E', '#2C2C2C'] : ['#3498db', '#2980b9', '#1a5276']}
        style={styles.background}
      />
      
      <TouchableOpacity 
        style={styles.themeToggle}
        onPress={toggleTheme}
      >
        <Text style={styles.themeToggleText}>{isDarkMode ? '☀️' : '🌙'}</Text>
      </TouchableOpacity>
      
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../src/assets/logo-clinica.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, {color: isDarkMode ? colors.text : 'white'}]}>MediCitas</Text>
        <Text style={[styles.subtitle, {color: isDarkMode ? colors.textSecondary : 'white'}]}>Tu salud, nuestra prioridad</Text>
      </View>
      
      <View style={[styles.featureContainer, {backgroundColor: isDarkMode ? 'rgba(44, 44, 44, 0.8)' : 'rgba(255, 255, 255, 0.2)'}]}>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>⏱️</Text>
          <Text style={[styles.featureText, {color: isDarkMode ? colors.text : 'white'}]}>Agenda citas médicas fácilmente</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>👨‍⚕️</Text>
          <Text style={[styles.featureText, {color: isDarkMode ? colors.text : 'white'}]}>Accede a los mejores especialistas</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>📱</Text>
          <Text style={[styles.featureText, {color: isDarkMode ? colors.text : 'white'}]}>Gestiona todo desde tu móvil</Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.loginButton, {backgroundColor: isDarkMode ? colors.primary : '#27ae60'}]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.registerButton, {backgroundColor: isDarkMode ? colors.secondary : '#3498db'}]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.footer, {color: isDarkMode ? 'rgba(176, 176, 176, 0.7)' : 'rgba(255, 255, 255, 0.7)'}]}>
        © 2023 MediCitas - Todos los derechos reservados
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeToggle: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  themeToggleText: {
    fontSize: 24,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
    opacity: 0.9,
  },
  featureContainer: {
    width: width * 0.85,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
  buttonContainer: {
    width: width * 0.85,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: '#27ae60',
  },
  registerButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
    fontSize: 12,
  },
});

export default WelcomeScreen;