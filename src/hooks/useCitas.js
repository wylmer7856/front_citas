// src/hooks/useCitas.js
import { useContext } from "react";
import { CitasContext } from "../context/CitasContext";

export default function useCitas() {
  return useContext(CitasContext);
}
