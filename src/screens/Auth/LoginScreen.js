import React, { useState, useContext, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InputField from '../../components/InputField';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      await signIn({ email, password });
      navigation.replace('RoleRoutes');
    } catch (err) {
      Alert.alert('Error de Autenticación', 'Credenciales inválidas. Verifica tu email y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            
            {/* Header con logo */}
            <Animated.View style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }]
              }
            ]}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoEmoji}>🏥</Text>
                </View>
                <Text style={styles.brandName}>MEDIPLAN</Text>
                <Text style={styles.brandSubtitle}>Sistema EPS Digital</Text>
              </View>
            </Animated.View>

            {/* Card principal del login */}
            <Animated.View style={[
              styles.loginCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}>
              
              {/* Título de bienvenida */}
              <View style={styles.welcomeSection}>
                <Text style={styles.welcomeTitle}>¡Bienvenido de vuelta!</Text>
                <Text style={styles.welcomeSubtitle}>
                  Accede a tu cuenta para continuar con tu atención médica
                </Text>
              </View>

              {/* Formulario */}
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <View style={styles.inputIconContainer}>
                    <Text style={styles.inputIcon}>📧</Text>
                  </View>
                  <InputField 
                    label="Correo Electrónico" 
                    value={email} 
                    onChangeText={setEmail} 
                    placeholder="correo@ejemplo.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputIconContainer}>
                    <Text style={styles.inputIcon}>🔒</Text>
                  </View>
                  <InputField 
                    label="Contraseña" 
                    value={password} 
                    onChangeText={setPassword} 
                    placeholder="••••••••" 
                    secureTextEntry
                  />
                </View>

                {/* Link de contraseña olvidada */}
                <TouchableOpacity style={styles.forgotPasswordContainer}>
                  <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
              </View>

              {/* Botón de login */}
              <TouchableOpacity 
                style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#4facfe', '#00f2fe']}
                  style={styles.loginButtonGradient}
                >
                  {loading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="small" color="#fff" />
                      <Text style={styles.loadingText}>Iniciando sesión...</Text>
                    </View>
                  ) : (
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonIcon}>🚀</Text>
                      <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>o continúa con</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Botones sociales */}
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>📱 SMS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>👨‍⚕️ Médico</Text>
                </TouchableOpacity>
              </View>

              {/* Link de registro */}
              <TouchableOpacity 
                onPress={() => navigation.navigate('Register')}
                style={styles.registerLinkContainer}
              >
                <Text style={styles.registerText}>
                  ¿No tienes cuenta? 
                  <Text style={styles.registerLink}> Regístrate aquí</Text>
                </Text>
              </TouchableOpacity>

            </Animated.View>

            {/* Footer con información adicional */}
            <Animated.View style={[
              styles.footer,
              { opacity: fadeAnim }
            ]}>
              <View style={styles.securityInfo}>
                <Text style={styles.securityIcon}>🔐</Text>
                <Text style={styles.securityText}>
                  Tus datos están protegidos con encriptación de nivel bancario
                </Text>
              </View>
              
              <View style={styles.helpContainer}>
                <TouchableOpacity style={styles.helpButton}>
                  <Text style={styles.helpButtonText}>🆘 Ayuda</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.helpButton}>
                  <Text style={styles.helpButtonText}>📞 Contacto</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  logoEmoji: {
    fontSize: 40,
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
    marginBottom: 5,
  },
  brandSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  loginCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    padding: 30,
    marginBottom: 20,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputIconContainer: {
    marginRight: 15,
    marginTop: 25,
  },
  inputIcon: {
    fontSize: 20,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 20,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonGradient: {
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  socialButton: {
    flex: 0.48,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  socialButtonText: {
    color: '#495057',
    fontWeight: '600',
    fontSize: 14,
  },
  registerLinkContainer: {
    alignItems: 'center',
  },
  registerText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  registerLink: {
    color: '#667eea',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  securityIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  securityText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
    fontWeight: '500',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  helpButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  helpButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;