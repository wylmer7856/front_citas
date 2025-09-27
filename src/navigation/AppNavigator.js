import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoleRoutes from './RoleRoutes';
import SplashScreen from '../screens/Inicio/SplashScreen';
import WelcomeScreen from '../screens/Inicio/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RoleRoutes" component={RoleRoutes} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
