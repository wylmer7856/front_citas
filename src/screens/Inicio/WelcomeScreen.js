import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  Animated, 
  Dimensions,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();
  
  // Animaciones
  const floatingAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Animación flotante continua
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    // Animación de rotación continua
    const rotationAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );

    // Animación de pulso
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    floatingAnimation.start();
    rotationAnimation.start();
    pulseAnimation.start();

    return () => {
      floatingAnimation.stop();
      rotationAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  const floatingTranslateY = floatingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ImageBackground
      source={require('../../assets/images/welcome-bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,100,200,0.8)', 'rgba(0,150,255,0.6)', 'rgba(255,255,255,0.3)']}
        style={styles.overlay}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header con logo y elementos flotantes */}
          <Animated.View style={[styles.header, { opacity: fadeInAnim }]}>
            <View style={styles.logoContainer}>
              <Animated.View style={[
                styles.medicalIcon,
                { transform: [{ scale: pulseAnim }] }
              ]}>
                <Text style={styles.medicalEmoji}>🏥</Text>
              </Animated.View>
              <Text style={styles.brandName}>MEDIPLAN</Text>
              <Text style={styles.brandTagline}>EPS Digital</Text>
            </View>

            {/* Elementos médicos flotantes animados */}
            <Animated.View style={[
              styles.floatingElement,
              styles.element1,
              { transform: [{ translateY: floatingTranslateY }] }
            ]}>
              <Text style={styles.floatingEmoji}>💊</Text>
            </Animated.View>

            <Animated.View style={[
              styles.floatingElement,
              styles.element2,
              { transform: [{ rotate: rotateInterpolate }] }
            ]}>
              <Text style={styles.floatingEmoji}>⚕️</Text>
            </Animated.View>

            <Animated.View style={[
              styles.floatingElement,
              styles.element3,
              { transform: [{ translateY: floatingTranslateY }] }
            ]}>
              <Text style={styles.floatingEmoji}>🩺</Text>
            </Animated.View>
          </Animated.View>

          {/* Título y subtítulo mejorados */}
          <Animated.View style={[styles.titleContainer, { opacity: fadeInAnim }]}>
            <Text style={styles.title}>Bienvenido a tu</Text>
            <Text style={styles.titleHighlight}>Sistema de Salud Digital</Text>
            <Text style={styles.subtitle}>
              La plataforma EPS más avanzada para gestionar tu bienestar médico de forma inteligente
            </Text>
          </Animated.View>

          {/* Misión y Visión */}
          <Animated.View style={[styles.missionSection, { opacity: fadeInAnim }]}>
            <View style={styles.missionCard}>
              <Text style={styles.missionIcon}>🎯</Text>
              <Text style={styles.missionTitle}>MISIÓN</Text>
              <Text style={styles.missionText}>
                Democratizar el acceso a la atención médica mediante tecnología innovadora
              </Text>
            </View>

            <View style={styles.missionCard}>
              <Text style={styles.missionIcon}>🔮</Text>
              <Text style={styles.missionTitle}>VISIÓN</Text>
              <Text style={styles.missionText}>
                Ser la EPS líder en transformación digital de la salud en Colombia
              </Text>
            </View>
          </Animated.View>

          {/* Botones rediseñados */}
          <Animated.View style={[styles.buttonContainer, { opacity: fadeInAnim }]}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => navigation.navigate('Register')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#00c6ff', '#0072ff']}
                style={styles.buttonGradient}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonIcon}>👤</Text>
                  <Text style={styles.primaryButtonText}>Crear Cuenta</Text>
                  <Text style={styles.buttonSubtext}>Únete gratis</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonIcon}>🔐</Text>
                <Text style={styles.secondaryButtonText}>Iniciar Sesión</Text>
                <Text style={styles.buttonSubtext}>¿Ya tienes cuenta?</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer con beneficios */}
          <Animated.View style={[styles.footer, { opacity: fadeInAnim }]}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🔒</Text>
              <Text style={styles.benefitText}>100% Seguro</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>⚡</Text>
              <Text style={styles.benefitText}>Atención 24/7</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🎁</Text>
              <Text style={styles.benefitText}>Sin Costo</Text>
            </View>
          </Animated.View>

        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
    height: 120,
  },
  logoContainer: {
    alignItems: 'center',
  },
  medicalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  medicalEmoji: {
    fontSize: 40,
  },
  brandName: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  brandTagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  floatingElement: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  element1: {
    top: 20,
    left: 30,
  },
  element2: {
    top: 10,
    right: 40,
  },
  element3: {
    bottom: 20,
    left: 50,
  },
  floatingEmoji: {
    fontSize: 25,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
    textAlign: 'center',
  },
  titleHighlight: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  missionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  missionCard: {
    flex: 0.48,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  missionIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 1,
  },
  missionText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 18,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    marginBottom: 20,
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  buttonSubtext: {
    fontSize: 12,
    opacity: 0.7,
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  benefitItem: {
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  benefitText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default WelcomeScreen;