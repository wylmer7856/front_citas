// src/context/HistorialContext.js
import React, { createContext, useState, useEffect } from "react";
import * as HistorialApi from "../api/historial";

export const HistorialContext = createContext();

export const HistorialProvider = ({ children }) => {
  const [historiales, setHistoriales] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistoriales = async () => {
    setLoading(true);
    try {
      const { data } = await HistorialApi.listarHistoriales();
      setHistoriales(data);
    } catch (e) {
      console.log("Error cargando historiales:", e);
    } finally {
      setLoading(false);
    }
  };

  const crearHistorial = async (payload) => {
    const { data } = await HistorialApi.crearHistorial(payload);
    setHistoriales((prev) => [...prev, data]);
  };

  const eliminarHistorial = async (id) => {
    await HistorialApi.eliminarHistorial(id);
    setHistoriales((prev) => prev.filter((h) => h.id !== id));
  };

  useEffect(() => {
    fetchHistoriales();
  }, []);

  return (
    <HistorialContext.Provider
      value={{ historiales, loading, fetchHistoriales, crearHistorial, eliminarHistorial }}
    >
      {children}
    </HistorialContext.Provider>
  );
};
