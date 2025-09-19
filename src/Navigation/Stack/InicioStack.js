import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistorialStack from "./HistorialStack";
import MedicoEspecialidadStack from "./MedicoEspecialidadStack";
import CitasStack from "./CitasStack"
import UsuariosStack from "./UsuariosStack"

export const Stack = createNativeStackNavigator();

export default function InicioStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name="UsuariosStack"
                component={UsuariosStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="HistorialStack"
                component={HistorialStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="MedicoEspecialidadStack"
                component={MedicoEspecialidadStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CitasStack"
                component={CitasStack}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}