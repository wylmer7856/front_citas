import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 3000); // 3 segundos de animación

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
  source={require('../../assets/lottie/Doctor.json')}
  autoPlay
  loop={false}
  style={{ width: 200, height: 200 }}
/>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
