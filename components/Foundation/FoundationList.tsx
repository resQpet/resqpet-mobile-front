import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Foundation, Foundations } from '~/domain/models/foundations/Foundation';
import { useRouter } from 'expo-router';

type Props = {
  foundation: Foundation;
}

export const Fundaciones = ({foundation}:Props) => {

  const Router = useRouter();

  return(
      <TouchableOpacity
            key={foundation.id}
            className="flex-row bg-white rounded-2xl p-4 mb-4 shadow-md shadow-black/10 border border-gray-200"
            activeOpacity={0.9}
            onPress={()=>{Router.push({pathname:'/screens/(Profile)/[ID]/Profile',
              params: {ID: foundation.id.toString()}
            });
          }}
          >
            
            {foundation.logo && (
              <Image
                source={{ uri: foundation.logo }}
                className="h-20 w-20 rounded-xl mr-4"
                resizeMode="cover"
              />
            )}

            {/* INFO */}
            <View className="flex-1 space-y-1">
              <Text className="text-lg font-bold text-gray-900">
                {foundation.name}
              </Text>


              <View className="flex-row items-center">
                <Ionicons name="call-outline" size={16} color="#6B7280" />
                <Text className="ml-1 text-gray-700">
                  {foundation.phone || "No disponible"}
                </Text>
              </View>

              <View className="flex-row items-center">
                <Ionicons name="location-outline" size={16} color="#6B7280" />
                <Text className="ml-1 text-gray-700">
                  {foundation.locations?.city || "No disponible"}
                </Text>
              </View>
            </View>
        </TouchableOpacity>
    )
};


