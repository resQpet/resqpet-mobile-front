import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const router = useRouter()

const HeaderBar = () => {
  return (
    <View className="flex-row items-center justify-between bg-white px-4 py-9">
      {/* Logo */}
      <Text className="text-2xl font-bold text-blue-600">resQpet</Text>

      <View className="flex-row items-center gap-2">

        <View className="relative">
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
            onPress={()=>{router.push('/screens/(Chatbot)/Chatbot')}}>
            <Ionicons name="chatbubble-ellipses" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}; 

export default HeaderBar;
