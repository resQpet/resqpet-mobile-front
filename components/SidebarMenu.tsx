import { View, Text } from 'react-native';
import { useAuthContext } from '~/contexts/AuthContext';
import { Link } from 'expo-router';

export default function SidebarMenu() {
    const { current, hasAuthority } = useAuthContext();

    if (!current) return null;

    return (
        <View className="p-4 space-y-4">
            <Text className="text-lg font-bold">
                Bienvenido, {current.info.firstName} {current.info.lastName}
            </Text>

            <Link href="/(main)" className="text-blue-600">Inicio</Link>
            <Link href="/(about)/about" className="text-blue-600">About</Link>

            {hasAuthority('access_full') && (
                <Link href="/(users)/usersList" className="text-blue-600">Usuarios</Link>
            )}

            {hasAuthority('access_full') && (
                <Link href="/(roles)/rolesList" className="text-blue-600">Roles</Link>
            )}
        </View>
    );
}
