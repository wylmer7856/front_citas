import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AdminStack from './AdminStack';
import MedicoStack from './MedicoStack';
import PacienteStack from './PacienteStack';

const RootNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  if (!user) return <AuthStack />;

  switch (user.role) {
    case 'ADMIN':
      return <AdminStack />;
    case 'MEDICO':
      return <MedicoStack />;
    case 'PACIENTE':
      return <PacienteStack />;
    default:
      return <AuthStack />;
  }
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});

export default RootNavigator;
