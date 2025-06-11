import { View, Text, ScrollView } from 'react-native';
import {ProtectedRoute} from "~/components/shared/ProtectedRoute";

export default function RolesList() {
    return (
        <ProtectedRoute requiredAuthority="Dev">
            <View className="flex-1 flex-row">
                {/* Sidebar */}

                {/* Contenido principal */}
                <ScrollView className="flex-1 bg-gray-50">
                    <View className="p-6">
                        <Text className="text-3xl font-bold mb-6">Gestión de Roles</Text>

                        <View className="bg-white rounded-lg p-6 shadow">
                            <Text className="text-xl font-semibold mb-4">Lista de Roles</Text>

                            <View className="border border-gray-200 rounded p-4">
                                <Text className="text-gray-600">
                                    Aquí se mostrará la lista de roles del sistema.
                                </Text>
                                <Text className="text-sm text-gray-500 mt-2">
                                    Implementa aquí tu lógica de listado de roles.
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ProtectedRoute>
    );
}