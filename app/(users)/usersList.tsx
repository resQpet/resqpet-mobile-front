import {ScrollView, Text, View} from 'react-native';
import {ProtectedRoute} from "~/components/shared/ProtectedRoute";

export default function UsersList() {
    return (
        <ProtectedRoute requiredAuthority="Dev">
            <View className="flex-1 flex-row">
                {/* Sidebar */}

                {/* Contenido principal */}
                <ScrollView className="flex-1 bg-gray-50">
                    <View className="p-6">
                        <Text className="text-3xl font-bold mb-6">Gestión de Usuarios</Text>

                        <View className="bg-white rounded-lg p-6 shadow">
                            <Text className="text-xl font-semibold mb-4">Lista de Usuarios</Text>

                            <View className="border border-gray-200 rounded p-4">
                                <Text className="text-gray-600">
                                    Aquí se mostrará la lista de usuarios del sistema.
                                </Text>
                                <Text className="text-sm text-gray-500 mt-2">
                                    Implementa aquí tu lógica de listado de usuarios.
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ProtectedRoute>
    );
}