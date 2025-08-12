import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TypeFoundation } from '~/domain/models/foundations/typeFoundation';

type Props = {
  TypeFoundation: TypeFoundation
}

export const TiposDeFundaciones = ({TypeFoundation}:Props) => {
  return (
     <View className="bg-white rounded-2xl p-4 mb-4 shadow-md shadow-black/10 border border-gray-200">
      <View className="flex-row items-center mb-2">
        <Ionicons name="pricetag-outline" size={20} color="#4B5563" />
        <Text className="text-lg font-semibold text-gray-800 ml-2">{TypeFoundation.name}</Text>
      </View>

      <Text className="text-gray-600 text-base">{TypeFoundation.description}</Text>

        <View className="space-y-3 pt-4 border-t border-gray-200">

          <View className="flex-row items-center space-x-2">
            <Ionicons name="calendar-outline" size={18} color="#6B7280" />
            <Text className="text-gray-600">
              Fundada el{" "}
              <Text className="font-semibold text-gray-800">
                {new Date(TypeFoundation.createdAt).toLocaleDateString()}
              </Text>
            </Text>
          </View>

        </View>
      </View>
  );
};

