import { ReactNode, useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '~/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredAuthority?: string;
  fallbackMessage?: string;
}

export const ProtectedRoute = ({
  children,
  requiredAuthority,
  fallbackMessage = 'No tienes permisos para acceder a esta sección',
}: ProtectedRouteProps) => {
  const { hasAuthority, authenticated, validating } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!validating && !authenticated) {
      router.replace('/(auth)/login'); // Asegúrate de usar el grupo correcto
    }
  }, [authenticated, validating, router]);

  if (validating) {
    return (
      <View className="flex-1 items-center justify-center px-1">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!authenticated) {
    return null;
  }

  if ((!!hasAuthority && requiredAuthority) || !hasAuthority || hasAuthority(requiredAuthority)) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-center text-gray-600">{fallbackMessage}</Text>
      </View>
    );
  }

  return <>{children}</>;
};
