// src/hooks/useHistorial.js
import { useContext } from "react";
import { HistorialContext } from "../context/HistorialContext";

export default function useHistorial() {
  return useContext(HistorialContext);
}
