import React from 'react';
import { Image, ScrollView, View } from 'react-native';

type Props = {
  images: { imageUrl: string }[];
};

export const PublicationImageCarousel = ({ images }: Props) => {
  if (images.length === 0) return null;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="items-center p-4">
        <Image
          source={{ uri: images[0].imageUrl }}
          className="mb-1 h-[160px] w-[270px] rounded-md"
          resizeMode="cover"
        />
      </View>
    </ScrollView>
  );
};
