import { useState, useEffect, useRef } from 'react';

// Hook para auto-refresh de datos
export const useAutoRefresh = (fetchFunction, interval = 30000, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err);
      console.error('Error en auto-refresh:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Carga inicial
    fetchData();

    // Configurar auto-refresh
    if (interval > 0) {
      intervalRef.current = setInterval(fetchData, interval);
    }

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, dependencies);

  // Función para refrescar manualmente
  const refresh = () => {
    fetchData();
  };

  // Función para detener el auto-refresh
  const stopAutoRefresh = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Función para iniciar el auto-refresh
  const startAutoRefresh = (newInterval = interval) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(fetchData, newInterval);
  };

  return {
    data,
    loading,
    error,
    refresh,
    stopAutoRefresh,
    startAutoRefresh,
  };
};








