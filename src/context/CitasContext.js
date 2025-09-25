// src/context/CitasContext.js
import React, { createContext, useState, useEffect } from "react";
import * as CitasApi from "../api/citas";

export const CitasContext = createContext();

export const CitasProvider = ({ children }) => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCitas = async () => {
    setLoading(true);
    try {
      const { data } = await CitasApi.listarCitas();
      setCitas(data);
    } catch (e) {
      console.log("Error cargando citas:", e);
    } finally {
      setLoading(false);
    }
  };

  const crearCita = async (payload) => {
    const { data } = await CitasApi.crearCita(payload);
    setCitas((prev) => [...prev, data]);
  };

  const eliminarCita = async (id) => {
    await CitasApi.eliminarCita(id);
    setCitas((prev) => prev.filter((c) => c.id !== id));
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  return (
    <CitasContext.Provider
      value={{ citas, loading, fetchCitas, crearCita, eliminarCita }}
    >
      {children}
    </CitasContext.Provider>
  );
};
