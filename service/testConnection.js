import { CONFIG } from './conexion';

// Función para probar la conexión con el backend
export const testConnection = async () => {
  try {
    console.log('Probando conexión con:', CONFIG.API_BASE_URL);
    
    const response = await fetch(`${CONFIG.API_BASE_URL}/test`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 5000,
    });
    
    if (response.ok) {
      console.log('✅ Conexión exitosa con el backend');
      return true;
    } else {
      console.log('❌ Backend respondió con error:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
    return false;
  }
};

// Función para probar el endpoint de login
export const testLoginEndpoint = async () => {
  try {
    console.log('Probando endpoint de login...');
    
    const response = await fetch(`${CONFIG.API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'test123'
      }),
    });
    
    console.log('Status del login:', response.status);
    const data = await response.text();
    console.log('Respuesta del login:', data);
    
    return response.status;
  } catch (error) {
    console.log('❌ Error probando login:', error.message);
    return null;
  }
};








