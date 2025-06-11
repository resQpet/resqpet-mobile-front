import {ReactNode, useEffect} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {useAuthContext} from '~/contexts/AuthContext';
import {useRouter} from 'expo-router';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredAuthority?: string;
    fallbackMessage?: string;
}

export const ProtectedRoute = ({
                                   children,
                                   requiredAuthority,
                                   fallbackMessage = "No tienes permisos para acceder a esta sección"
                               }: ProtectedRouteProps) => {
    const {hasAuthority, authenticated, validating} = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!validating && !authenticated) {
            router.replace('/login');
        }
    }, [authenticated, validating, router]);

    if (validating) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!authenticated) {
        return null;
    }

    if (requiredAuthority && !hasAuthority(requiredAuthority)) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-center text-gray-600">{fallbackMessage}</Text>
            </View>
        );
    }

    return <>{children}</>;
};