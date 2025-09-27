import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserProvider';
import { ThemeProvider } from './src/context/ThemeContext';


const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <StatusBar barStyle="light-content" backgroundColor="#007bff" />
          <AppNavigator />
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
