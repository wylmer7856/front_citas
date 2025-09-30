import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Image } from "react-native";
import { MedicoService } from "../../service/medicoService";
import Header from "../../src/components/Header";
import { AuthContext } from "../../src/context/AuthContext";

export default function PerfilMedicoScreen({ navigation }) {
  const [perfil, setPerfil] = useState(null);
  const [saving, setSaving] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.id) {
      MedicoService.getPerfil(user.id)
        .then(res => setPerfil({
          name: res?.user?.name || user?.name || '',
          email: res?.user?.email || user?.email || '',
          especialidad: res?.especialidad || '',
        }))
        .catch(err => console.error(err));
    }
  }, [user]);

  const actualizarPerfil = async () => {
    try {
      setSaving(true);
      await MedicoService.updatePerfil(user.id, { especialidad: perfil.especialidad });
      alert("Perfil actualizado");
    } catch (e) {
      console.error(e);
      alert("No se pudo actualizar el perfil");
    } finally {
      setSaving(false);
    }
  };

  if (!perfil) {
    return (
      <View style={styles.container}>
        <Header title="Perfil del Médico" showBack={true} onBackPress={() => navigation.goBack()} />
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Cargando perfil...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Perfil del Médico" showBack={true} onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarBox}>
          <Image source={{ uri: 'https://img.icons8.com/color/96/doctor-male.png' }} style={styles.avatar} />
          <Text style={styles.name}>{perfil.name}</Text>
          <Text style={styles.email}>{perfil.email}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Especialidad</Text>
          <TextInput
            style={styles.input}
            placeholder="Especialidad"
            value={perfil.especialidad}
            onChangeText={(text) => setPerfil({ ...perfil, especialidad: text })}
          />
        </View>

        <TouchableOpacity style={[styles.button, saving && { opacity: .7 }]} onPress={actualizarPerfil} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Guardar Cambios</Text>}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { padding: 20 },
  loadingBox:{ flex:1, alignItems:'center', justifyContent:'center' },
  loadingText:{ marginTop:10, color:'#7f8c8d' },
  avatarBox:{ alignItems:'center', marginTop:10, marginBottom:20 },
  avatar:{ width:96, height:96 },
  name:{ fontSize:20, fontWeight:'bold', color:'#2c3e50', marginTop:8 },
  email:{ fontSize:14, color:'#7f8c8d' },
  card:{ backgroundColor:'#fff', borderRadius:12, padding:16, elevation:3 },
  label:{ color:'#7f8c8d', marginBottom:6, fontWeight:'600' },
  input:{ borderWidth:1, borderColor:'#ecf0f1', borderRadius:10, padding:12, fontSize:16, color:'#2c3e50' },
  button:{ marginTop:16, backgroundColor:'#3498db', padding:16, borderRadius:12, alignItems:'center' },
  buttonText:{ color:'#fff', fontWeight:'bold' }
});
