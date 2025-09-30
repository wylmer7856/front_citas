import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../Screen/Auth/LoginScreen';
import RegisterScreen from '../../Screen/Auth/RegisterScreen';
import WelcomeScreen from '../../Screen/Inicio/WelcomeScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthStack;
