import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Dashboard = () => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient
      colors={['#3B82F6', '#60A5FA', '#DBEAFE', '#FFFFFF']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcons}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🔔</Text>
            </View>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>⚙️</Text>
            </View>
          </View>
        </View>

        {/* Main Welcome Section */}
        <View style={styles.welcomeSection}>
          
          {/* Avatar/Logo */}
          <View style={styles.avatarContainer}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <Text style={styles.avatarEmoji}>👨‍💼</Text>
              </View>
              {/* Decorative elements */}
              <View style={styles.starDecoration}>
                <Text style={styles.starText}>⭐</Text>
              </View>
              <View style={styles.dotDecoration}></View>
            </View>
          </View>

          {/* Welcome Text */}
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>¡Bienvenido!</Text>
            <Text style={styles.welcomeSubtitle}>Panel de Administración</Text>
            <Text style={styles.welcomeDescription}>
              Tu espacio de control donde la gestión médica se vuelve simple y elegante.
            </Text>
          </View>
        </View>
        
      </ScrollView>

      {/* Floating Decorative Elements */}
      <View style={styles.floatingDot1}></View>
      <View style={styles.floatingDot2}></View>
      <View style={styles.floatingDot3}></View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  avatarContainer: {
    marginBottom: 30,
    position: 'relative',
  },
  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  innerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FCD34D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 40,
  },
  starDecoration: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starText: {
    fontSize: 12,
  },
  dotDecoration: {
    position: 'absolute',
    bottom: -5,
    left: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EC4899',
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 24,
    color: 'rgba(245, 5, 5, 0.9)',
    fontWeight: '300',
    marginBottom: 15,
    textAlign: 'center',
  },
  welcomeDescription: {
    fontSize: 16,
    color: 'rgba(9, 9, 9, 0.94)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statEmoji: {
    fontSize: 28,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#374151',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  decorativeIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  decorativeItem: {
    alignItems: 'center',
  },
  decorativeIconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  decorativeEmoji: {
    fontSize: 24,
  },
  decorativeLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 50,
  },
  floatingDot1: {
    position: 'absolute',
    top: 100,
    left: 30,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  floatingDot2: {
    position: 'absolute',
    top: 200,
    right: 40,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  floatingDot3: {
    position: 'absolute',
    bottom: 150,
    left: 50,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
});

export default Dashboard;