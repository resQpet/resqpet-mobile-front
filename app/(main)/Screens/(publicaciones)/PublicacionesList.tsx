import {Button} from '~/components/Button';
import {useAuthContext} from '~/contexts/AuthContext';
import {Text, View,ScrollView, ActivityIndicator,Image,TouchableOpacity} from 'react-native';
import {AppScreen} from '~/components/AppScreen';
import { Publicaciones } from '~/domain/model/publicaciones/publicaciones';
import { useEffect,useState } from 'react';
import { publicationsService } from '~/services/publicaciones/Publicaciones';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Likers } from '~/services/publicaciones/LikeServices';
import { LikeCount,LikeTrue } from '~/domain/model/publicaciones/Likes';

const Like = Likers.instance
const Publicacion = publicationsService.instance

export default function PublicacionesList() {
  const [publicaciones, setPublicaciones] = useState<Publicaciones | null>(null);
  const [loading, setLoading] = useState(true);
  const [likecounts, setLikecounts] = useState<Record<number, number>>({});
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});

  useEffect(() => {

    const FetchPublicaciones = async () => {
      try {
        const res = await Publicacion.GetPublicaciones(20);
        setPublicaciones(res);

        const ids = res.content.map(p => p.id);

        // Obtener conteo de likes
        const likes = await Like.GetMultipleLikerCount(ids);

        const likeMap: Record<number, number> = {};
        ids.forEach((id, index) => {
          likeMap[id] = likes[index]?.result ?? 0;
        });
        setLikecounts(likeMap);

        // Obtener si el usuario ya dio like a cada publicación
        const likeTrueMap: Record<number, boolean> = {};
        for (const id of ids) {
          try {
            const res = await Like.GetLikeTrue(id);
            likeTrueMap[id] = res.result; 
          } catch {
            likeTrueMap[id] = false;
          }
        }
        setLikedMap(likeTrueMap);

            }
            catch(e){
                console.error("error al cargar",e)
            }
            finally{
                setLoading(false)
            } 
        } 
        FetchPublicaciones();
    },[])

    const handleLikeToggle = async (publicationId: number) => {
        const isLiked = likedMap[publicationId];

        // Actualizar estado local
        setLikedMap(prev => ({
            ...prev,
            [publicationId]: !isLiked
        }));

        setLikecounts(prev => ({
            ...prev,
            [publicationId]: prev[publicationId] + (isLiked ? -1 : 1)
        }));

        try {
            if (isLiked) {
            await Like.deleteLike(publicationId);
            } else {
            await Like.PostLike(publicationId);
            }
        } catch (error) {
            console.error("Error al actualizar el like:", error);
        }
        };
 

    if (loading){
        return(
             <View className="flex-1 justify-center items-center bg-white px-6">
                <Text className="text-lg mt-4 text-gray-600">Cargando publicaciones...</Text>
                <ActivityIndicator size="large" color="#4b5563" className="mt-4" />
            </View>
        )
    }

    return (
       <AppScreen title="publicaciones">
        <ScrollView className="bg-white px-4 py-6">
              {publicaciones?.content.map((publicacion) => (
                <View
                    key={publicacion.id}
                    className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm"
                >
                    <View className="flex-row items-center space-x-2 mb-2">
                        <View className="w-6 h-6 rounded-full items-center justify-center">

                            <Image className='w-[25px] h-[25px] mb-1 rounded-md' source={{uri: publicacion.foundation.logo}}/>

                        </View>

                        <Text className="text-sm text-gray-800 font-medium p-2">
                            {publicacion.foundation.name}
                        </Text>
                        
                    </View>
                    
                    <Text className="text-lg font-semibold text-gray-900 mb-1">
                    {publicacion.title}
                    </Text>

                   
                    <Text className="text-gray-700 mb-2">{publicacion.content}</Text>


                    {publicacion.images?.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {publicacion.images?.length > 0 && (
                           <View className='p-4 items-center '>
                            <Image
                                source={{ uri: publicacion.images[0].imageUrl }}
                                className='w-[270px] h-[160px] mb-1 rounded-md'
                                resizeMode="cover"
                              />
                            </View>
                            )}
                                
                    </ScrollView>
          
                     )}

                    <View className="flex-row justify-between items-center">
                        <View className="flex-row">
                            <TouchableOpacity onPress={() => handleLikeToggle(publicacion.id)}

                        className="mr-3 flex-row">
                                <Ionicons name={likedMap[publicacion.id] ? 'heart':'heart-outline'} 
                                size={20} 
                                color={likedMap[publicacion.id] ? 'red': 'gray'}/>
                                <Text>{likecounts[publicacion.id] } </Text>

                            </TouchableOpacity>


                            <TouchableOpacity>
                                <Ionicons name='chatbubbles-outline'
                                size={24}
                                color='gray'/>
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
    ))}
      </ScrollView>
    </AppScreen>
    );
}
