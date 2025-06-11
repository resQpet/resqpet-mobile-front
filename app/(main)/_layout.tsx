import { Drawer } from 'expo-router/drawer';
import { useAuthContext } from '~/contexts/AuthContext';

export default function MainLayout() {
    const { validating, authenticated, hasAuthority } = useAuthContext();

    if (validating || !authenticated) return null;

    return (
        <Drawer>
            <Drawer.Screen name="index" options={{ title: 'Inicio' }} />
            <Drawer.Screen name="about" options={{ title: 'About' }} />

            {hasAuthority('access_full') && (
                <Drawer.Screen name="(users)/usersList" options={{ title: 'Usuarios' }} />
            )}

            {hasAuthority('access_full') && (
                <Drawer.Screen name="(roles)/rolesList" options={{ title: 'Roles' }} />
            )}
        </Drawer>
    );
}
