import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PublicationFoundationInfo } from './PublicationFoundationInfo';
import { PublicationAnimalInfo } from './PublicationAnimalInfo';
import { Publicacion } from '~/domain/models/publication/Publicaciones';
import { useRouter } from 'expo-router';


type Props = {
  publicacion: Publicacion;
  liked: boolean;
  likeCount: number;
  onLike: (id: number) => void;
  onOpenComments: (id: number) => void;
};

export const PublicationCard = ({ publicacion, liked, likeCount, onLike, onOpenComments, }: Props) => {

  const Router = useRouter();
  return (
    <View className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

       <TouchableOpacity
       key={publicacion.foundation.id}
       onPress={()=>{Router.push({pathname: "/screens/(Profile)/[ID]/Profile",
        params: { ID: publicacion.foundation.id.toString() }});
        }}>
            <PublicationFoundationInfo
              logo={publicacion.foundation.logo}
              name={publicacion.foundation.name}
            />  
        </TouchableOpacity>
      
      <Text className="mb-1 text-lg font-semibold text-gray-900">{publicacion.title}</Text>

      <Text className="mb-2 text-gray-700">{publicacion.content}</Text>

      {publicacion.images?.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="items-center p-4">
            <Image
              source={{ uri: publicacion.images[0].imageUrl }}
              className="mb-1 h-[160px] w-[270px] rounded-md"
              resizeMode="cover"
            />
          </View>
        </ScrollView>
      )}

      {publicacion.animal?.name && publicacion.animal?.species && (
        <PublicationAnimalInfo animal={publicacion.animal} />
      )}

      <View className="flex-row items-center justify-between">
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => onLike(publicacion.id)}
            className="mr-3 flex-row items-center space-x-1">
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={20}
              color={liked ? 'red' : 'gray'}
            />
            <Text>{likeCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onOpenComments(publicacion.id)}>
            <Ionicons name="chatbubbles-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <Text className="text-sm text-gray-400">
          {new Date(publicacion.eventDate).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </View>
    </View>
  );
};
