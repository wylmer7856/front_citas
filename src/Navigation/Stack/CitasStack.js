import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListarCitas from "../../Screens/Citas/ListarCitas";
import DetalleCita from "../../Screens/Citas/DetalleCita";
import Crear_editarCitas from "../../Screens/Citas/Crear_editarCitas";

const Stack = createNativeStackNavigator();
export default function CitasStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="listarCitas"
                component={ListarCitas}
                options={{ title: "Citas" }}
            />
            <Stack.Screen
                name="detalleCita"
                component={DetalleCita}
                options={{ title: "Detalle Cita" }}
            />
            <Stack.Screen
                name="crearEditarCita"
                component={Crear_editarCitas}
                options={{ title: "Crear / Editar Cita" }}
            />
        </Stack.Navigator>
    );
}   