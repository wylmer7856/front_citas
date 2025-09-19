import { createStaticNavigation } from "@react-navigation/native";
import ListarHistorial from "../../Screen/Historial/listarHistorial";
import DetalleHistorial from "../../Screen/Historial/detalleHistorial";
import crear_editar from "../../Screen/Historial/crear_editarHistorial";

const Stack = createStaticNavigation();

export default function HistorialStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListarHistorial" component={ListarHistorial} options={{ title: "Historial" }} />        
            <Stack.Screen name="DetalleHistorial" component={DetalleHistorial} options={{ title: "Detalle del Historial" }} />
            <Stack.Screen name="CrearEditarHistorial" component={crear_editar} options={{ title: "Crear o Editar Historial" }} />
        </Stack.Navigator>
    )
}


