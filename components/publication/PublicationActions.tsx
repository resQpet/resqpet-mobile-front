import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  publicationId: number;
  liked: boolean;
  likeCount: number;
  onLike: (id: number) => void;
  onOpenComments: (id: number) => void;
};

export const PublicationActions = ({ publicationId, liked, likeCount, onLike, onOpenComments, }: Props) => {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row">
        <TouchableOpacity
          onPress={() => onLike(publicationId)}
          className="mr-3 flex-row items-center space-x-1">
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={20}
            color={liked ? 'red' : 'gray'}
          />
          <Text>{likeCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onOpenComments(publicationId)}>
          <Ionicons name="chatbubbles-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
