import { createStaticNavigation } from "@react-navigation/native";
import crear_editar from "../../Screen/Usuarios/crear_editar";
import ListarUsuarios from "../../Screen/Usuarios/listarUsuarios";
import DetalleUsuarios from "../../Screen/Usuarios/detalle";

const Stack = createStaticNavigation();

export default function UsuariosStack() {
    Return (
        <Stack.Navigator>
            <Stack.Screen name="ListarUsuarios" component={ListarUsuarios} options={{ title: "Usuarios" }} />
            <Stack.Screen name="DetalleUsuarios" component={DetalleUsuarios} options={{ title: "Detalle de los Usuarios" }} />
            <Stack.Screen name="CrearEditarUsuarios" component={crear_editar} options={{ title: "Crear o Editar Usuarios" }} />
        </Stack.Navigator>
    )   

}