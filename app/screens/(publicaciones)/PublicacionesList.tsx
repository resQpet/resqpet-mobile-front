import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { AppScreen } from '~/components/AppScreen';
import { Publicaciones } from '~/domain/models/publication/Publicaciones';
import { publicationsService } from '~/services/publicaciones/Publicaciones';
import { Likers } from '~/services/publicaciones/LikeServices';
import { Comment } from '~/services/publicaciones/CommentService';
import { Comments } from '~/domain/models/publication/Comment';
import Toast from 'react-native-toast-message';
import BottomSheet from '@gorhom/bottom-sheet';
import { PublicationCard } from '~/components/publication/PublicationCard';
import { BottomSheets } from '~/components/io/input/PageBottomSheet';
import PageComments from '~/components/io/input/PageComments';
import { FoundationService } from '~/services/fundaciones/foundations/FoundationService';

const Like = Likers.instance;
const Commen = Comment.instance;
const Publicacion = publicationsService.instance;
const Foundations = FoundationService.instance;

type Props = {
  IdFoundation?:number;
}

export default function PublicacionesList ({IdFoundation}:Props){
  const [publicaciones, setPublicaciones] = useState<Publicaciones | null>(null);
  const [loading, setLoading] = useState(true);
  const [likecounts, setLikecounts] = useState<Record<number, number>>({});
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});
  const [comentarios, setComentarios] = useState<Comments>({ content: [] });
  const [idPublicacionActual, setIdPublicacionActual] = useState<number | undefined>(undefined);

  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        
        let res : Publicaciones

        if(IdFoundation){
         res = await Foundations.getfoundationPublication(IdFoundation)
        }
        else{
          res = await Publicacion.GetPublicaciones(20);
        }

        setPublicaciones(res)
       
        const ids = res.content.map((p) => p.id);
        
        const likes = await Like.GetMultipleLikerCount(ids);
        const likeMap: Record<number, number> = {};
        ids.forEach((id, index) => {
          likeMap[id] = likes[index]?.result ?? 0;
        });
        setLikecounts(likeMap);

        const likeTrueMap: Record<number, boolean> = {};
        await Promise.all(
          ids.map((id) =>
            Like.GetLikeTrue(id)
              .then((res) => {
                likeTrueMap[id] = res.result;
              })
              .catch(() => {
                likeTrueMap[id] = false;
              })
          )
        );
        setLikedMap(likeTrueMap);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones()
  }, []);

  const handleLikeToggle = (publicationId: number) => {
    const isLiked = likedMap[publicationId];

    setLikedMap((prev) => ({
      ...prev,
      [publicationId]: !isLiked,
    }));

    setLikecounts((prev) => ({
      ...prev,
      [publicationId]: prev[publicationId] + (isLiked ? -1 : 1),
    }));

    const promise = isLiked ? Like.deleteLike(publicationId) : Like.PostLike(publicationId);
    promise.catch(() => {
      Toast.show({ type: 'error', text1: 'Error de like' });
    });
  };

  const handleOpenComments = (publicationId: number) => {
    Commen.GetComments(publicationId)
      .then((res) => {
        setComentarios(res);
        setIdPublicacionActual(publicationId);
        sheetRef.current?.expand();
      })
      .catch(() => {
        Toast.show({ type: 'error', text1: 'Error al cargar los comentarios' });
      });
  };

  const reloadComments = () => {
    if (!idPublicacionActual) return;
    Commen.GetComments(idPublicacionActual)
      .then((res) => setComentarios(res))
      .catch(() => {
        Toast.show({ type: 'error', text1: 'No se pudieron actualizar los comentarios' });
      });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="mt-4 text-lg text-gray-600">Cargando publicaciones...</Text>
        <ActivityIndicator size="large" color="#4b5563" className="mt-4" />
      </View>
    );
  }

  return (
    <AppScreen title="Publicaciones">
     <ScrollView className="bg-white px-4 flex-1">
      {publicaciones?.content.length === 0 ? (
        <View className="flex-1 items-center justify-center mt-10">
          <Text className="text-gray-500 text-lg">No hay publicaciones disponibles.</Text>
        </View>
      ) : (
        publicaciones?.content.map((publicacion) => (
          <PublicationCard
            key={publicacion.id}
            publicacion={publicacion}
            liked={likedMap[publicacion.id]}
            likeCount={likecounts[publicacion.id]}
            onLike={handleLikeToggle}
            onOpenComments={handleOpenComments}
          />
        ))
      )}
    </ScrollView>

      <BottomSheets ref={sheetRef} title="Comentarios">
        
          <PageComments
            content={comentarios.content}
            publicacionId={idPublicacionActual}
            onCommentPosted={reloadComments}
          />
      </BottomSheets>
    </AppScreen>
  );
}
