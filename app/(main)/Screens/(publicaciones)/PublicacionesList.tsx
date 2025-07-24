import {Text, View,ScrollView, ActivityIndicator,Image,TouchableOpacity,Modal} from 'react-native';
import {AppScreen} from '~/components/AppScreen';
import { Publicaciones } from '~/domain/model/publicaciones/publicaciones';
import { useEffect,useRef,useState } from 'react';
import { publicationsService } from '~/services/publicaciones/Publicaciones';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Likers } from '~/services/publicaciones/LikeServices';
import { Comment } from '~/services/publicaciones/CommentService';
import { Comments } from '~/domain/model/publicaciones/Comment';
import Toast from 'react-native-toast-message';
import { BottomSheets } from '~/components/io/input/pageBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import Pagecomments from '~/components/io/input/pageComments';
import React from 'react';


const Like = Likers.instance;
const Commen= Comment.instance;
const Publicacion = publicationsService.instance;

export default function PublicacionesList() {
  const [publicaciones, setPublicaciones] = useState<Publicaciones | null>(null);
  const [loading, setLoading] = useState(true);
  const [likecounts, setLikecounts] = useState<Record<number, number>>({});
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});
  const [comentarios, setComentarios] = React.useState<Comments>({ content: [] });
  const [IdpublicacionActual, setIdpublicacionActual] = useState<number | undefined>(undefined);

  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
  const FetchPublicaciones = () => {
    
    Publicacion.GetPublicaciones(20)
        .then((res) => {
                setPublicaciones(res);

                const ids = res.content.map(p => p.id);

                return Like.GetMultipleLikerCount(ids).then((likes) => {
                const likeMap: Record<number, number> = {};
                ids.forEach((id, index) => {
                    likeMap[id] = likes[index]?.result ?? 0;
                });
                setLikecounts(likeMap);
                // Obtener si el usuario ya dio like a cada publicación
                const likeTrueMap: Record<number, boolean> = {};

                const likeTruePromises = ids.map((id) =>
                    Like.GetLikeTrue(id)
                    .then((res) => {
                        likeTrueMap[id] = res.result;
                    })
                    .catch(() => {
                        likeTrueMap[id] = false;
                    })
                );

                return Promise.all(likeTruePromises).then(() => {
                    setLikedMap(likeTrueMap);
                });
                });
                },(()=>{ 
                    Toast.show({
                    type: 'error',
                    text1: 'Error de carga',
                    });
                }))
        .finally(() => {
            setLoading(false);
        });
     };
    FetchPublicaciones();
    }, []);

    const handleLikeToggle = (publicationId: number) => {
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

        const promise = isLiked
            ? Like.deleteLike(publicationId)
            : Like.PostLike(publicationId)

        promise.then(
            () => {
    
            },
            () => {
                Toast.show({
                type: 'error',
                text1: 'Error de like',
                });
            }
            );
    };

    const handleOpenComments = (publicationId: number) => {
        Commen.GetComments(publicationId)
        .then((res) => {
            setComentarios(res);
            setIdpublicacionActual(publicationId);
            sheetRef.current?.expand();
        });
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

                            <TouchableOpacity onPress={() => handleOpenComments(publicacion.id)}>
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

               </View>))}
      </ScrollView>

      <BottomSheets ref = {sheetRef} title='Comentarios'>
        <Pagecomments 
                content={comentarios.content} 
                publicacionId={IdpublicacionActual}
            />
      </BottomSheets>

    </AppScreen>
    );
}
