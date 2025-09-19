import { createStaticNavigationContainer, createNativeStackNavigator } from "@react-navigation/native";
import Crear_EditarM_E from "../../Screen/MedicoEspecialidad/Crear_EditarM_E";
import ListarM_E from "../../Screen/MedicoEspecialidad/ListarM_E";
import DetalleM_E from "../../Screen/MedicoEspecialidad/DetalleM_E";

const Stack = createNativeStackNavigator();

export default function MedicoEspecialidadStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListarM_E" component={ListarM_E} options={{ title: "Medico Especialidad" }} />
            <Stack.Screen name="DetalleM_E" component={DetalleM_E} options={{ title: "Detalle de Medico Especialidad" }} />
            <Stack.Screen name="CrearEditarM_E" component={Crear_EditarM_E} options={{ title: "Crear o Editar Medico Especialidad" }} />
        </Stack.Navigator>
    )
}
