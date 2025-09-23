import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const images = [
  {
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeuzm5pAyJBeaqGUvXEG7DgLZIc_i1jY_dTS7t_OuC44_Dt4B6gACxRkYCLBdie8n7oqA&usqp=CAU',
    caption: 'Atención médica personalizada',
  },
  {
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8E6H8K3YXEyoeLxiDDQYb40xbDwCJWcCCrA&s',
    caption: 'Especialistas certificados',
  },
  {
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDEFaA2J1cqW0Jn-R8bNIsjtyq_nWlCTqKEw&s',
    caption: 'Gestión de citas eficiente',
  },
];

export default function InicioScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.caption}>{item.caption}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a CITASFT</Text>
      <Text style={styles.subtitle}>Tu sistema de gestión de citas médicas</Text>

      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.loginButton}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.registerButton}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Versión 1.0 • Desarrollado por Wilmer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Softer background for a modern look
    alignItems: 'center',
    justifyContent: 'space-between', // Better spacing distribution
    padding: 20,
    paddingTop: 40, // Added top padding for status bar
  },
  title: {
    fontSize: 28, // Slightly larger for emphasis
    fontWeight: '700', // Bolder for modern typography
    color: '#1a2a44', // Deeper color for contrast
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5, // Subtle letter spacing for elegance
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5a77', // Softer, complementary color
    textAlign: 'center',
    marginBottom: 25,
    fontStyle: 'italic', // Italic for a friendly tone
    lineHeight: 22, // Improved readability
  },
  carousel: {
    marginBottom: 30, // Increased spacing for balance
    borderRadius: 12, // Rounded edges for carousel
    overflow: 'hidden', // Ensure content stays within bounds
  },
  slide: {
    width: width * 0.85, // Slightly wider for prominence
    marginHorizontal: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12, // Softer corners
    padding: 12,
    alignItems: 'center',
    elevation: 5, // Increased shadow for depth
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    transform: [{ scale: 1 }], // Ready for potential animations
  },
  image: {
    width: '100%',
    height: 200, // Slightly taller for better visuals
    borderRadius: 10,
    marginBottom: 8, // Space between image and caption
  },
  caption: {
    fontSize: 15, // Slightly larger for readability
    color: '#1a2a44', // Consistent with title color
    textAlign: 'center',
    fontWeight: '500', // Medium weight for balance
    paddingHorizontal: 10,
    lineHeight: 20, // Improved readability
  },
  loginButton: {
    backgroundColor: '#1e90ff', // Brighter, modern blue
    paddingVertical: 14, // Taller button for better touch
    paddingHorizontal: 30,
    borderRadius: 10, // Softer corners
    alignItems: 'center',
    width: '85%', // Slightly wider
    marginTop: 20,
    elevation: 3, // Subtle shadow
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  registerButton: {
    backgroundColor: '#2ecc71', // Vibrant green for contrast
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '85%',
    marginTop: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17, // Slightly larger for prominence
    fontWeight: '600', // Bolder for emphasis
    letterSpacing: 0.5, // Subtle spacing for readability
  },
  footer: {
    marginTop: 30,
    fontSize: 13, // Slightly larger for clarity
    color: '#6b7280', // Softer gray for modern look
    fontStyle: 'italic', // Matches subtitle style
    textAlign: 'center',
  },
});