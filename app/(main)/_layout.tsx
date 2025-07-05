import { Drawer } from 'expo-router/drawer';
import { useAuthContext } from '~/contexts/AuthContext';

export default function MainLayout() {
    const { validating, authenticated, hasAuthority } = useAuthContext();

    if (validating || !authenticated) return null;

    return (
        <Drawer>
            <Drawer.Screen name="index" options={{ title: 'Inicio' }} />
            <Drawer.Screen name="Screens/(about)/aboaut" options={{ title: 'About' }} />
            {hasAuthority('access_full') && (
                <Drawer.Screen name="Screens/(users)/usersList" options={{ title: 'Usuarios' }} />
            )};
            {hasAuthority('access_full') && (
                <Drawer.Screen name="Screens/(roles)/rolesList" options={{ title: 'Roles' }} />
            )};
            <Drawer.Screen name='Screens/(publicaciones)PublicacionesList' options={{title:'publicaciones'}} />
            <Drawer.Screen name='Screens/(fundaciones)/fundacionesList' options={{title:'Fundaciones'}}/>
        </Drawer>
    );
}
