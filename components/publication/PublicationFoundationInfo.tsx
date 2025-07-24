import React from 'react';
import { Image, Text, View } from 'react-native';

type Props = {
  logo: string;
  name: string;
};

export const PublicationFoundationInfo = ({ logo, name }: Props) => {
  return (
    <View className="mb-2 flex-row items-center space-x-2">
      <View className="h-6 w-6 items-center justify-center rounded-full">
        <Image className="mb-1 h-[25px] w-[25px] rounded-md" source={{ uri: logo }} />
      </View>
      <Text className="p-2 text-sm font-medium text-gray-800">{name}</Text>
    </View>
  );
};
