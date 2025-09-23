// src/Navigation/stacks/UsuariosStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Pantallas temporales hasta que crees las reales
function ListarUsuarios({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('CrearUsuario')}
      >
        <Text style={styles.buttonText}>Crear Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

function CrearUsuario({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Usuario</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

function EditarUsuario({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetalleUsuario({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle Usuario</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 8, minWidth: 200, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

const Stack = createStackNavigator();

export default function UsuariosStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#2196F3' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen 
        name="ListarUsuarios" 
        component={ListarUsuarios}
        options={{ title: 'Gestión de Usuarios' }}
      />
      <Stack.Screen 
        name="CrearUsuario" 
        component={CrearUsuario}
        options={{ title: 'Crear Usuario' }}
      />
      <Stack.Screen 
        name="EditarUsuario" 
        component={EditarUsuario}
        options={{ title: 'Editar Usuario' }}
      />
      <Stack.Screen 
        name="DetalleUsuario" 
        component={DetalleUsuario}
        options={{ title: 'Detalle del Usuario' }}
      />
    </Stack.Navigator>
  );
}