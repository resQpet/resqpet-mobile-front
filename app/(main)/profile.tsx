import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-semibold">Mi Perfil</Text>
      <Text className="text-gray-500 mt-2">Aquí puedes ver y editar tu información.</Text>
    </View>
  );
}