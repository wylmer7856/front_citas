import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PerfilCard = ({ user }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{user.name}</Text>
    <Text>Email: {user.email}</Text>
    <Text>Rol: {user.role}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { padding: 16, borderWidth: 1, borderRadius: 10, marginVertical: 10 },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 }
});

export default PerfilCard;
