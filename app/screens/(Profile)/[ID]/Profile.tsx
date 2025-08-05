import React,{useEffect,useRef,useState} from "react";
import { View,Text,  SafeAreaView} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { FoundationService } from "~/services/fundaciones/foundations/FoundationService";
import { Foundation } from "~/domain/models/foundations/Foundation";
import { AppScreen } from "~/components/AppScreen";
import { FoundationProfile } from "~/components/Profile/ProfileCard";
import { PublicationCard } from "~/components/publication/PublicationCard";
import {  Publicaciones } from "~/domain/models/publication/Publicaciones";
import { Likers } from "~/services/publicaciones/LikeServices";
import { Comment } from '~/services/publicaciones/CommentService';
import { Comments } from '~/domain/models/publication/Comment';
import { BottomSheets } from "~/components/io/input/PageBottomSheet";
import PageComments from "~/components/io/input/PageComments";
import BottomSheet from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";
import { FollowerServices } from "~/services/fundaciones/foundations/FollowerService";
import { FoundationFollowsCount, OnFollowFoundation } from "~/domain/models/foundations/Follows";

const Foundations = FoundationService.instance;
const Like = Likers.instance;
const Commen = Comment.instance;
const Follow = FollowerServices.instance;

export default function Profile () {

  const [loading, setLoading] = useState(true);
  const [foundationsInfo, setFoundationsInfo] = useState<Foundation | null>(null)
  const [publicaciones, setPublicaciones] = useState<Publicaciones | null>(null);
  const [likecounts, setLikecounts] = useState<Record<number, number>>({});
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});
  const [comentarios, setComentarios] = useState<Comments>({ content: [] });
  const [idPublicacionActual, setIdPublicacionActual] = useState<number | undefined>(undefined);
  const [OnFollows,setOnFollow] = useState <OnFollowFoundation | null >(null);
  const [FollowsCount, setFollowCount] = useState<FoundationFollowsCount | null >(null)
  const { ID } = useLocalSearchParams();
  const IdFoundation = Number(ID)


  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
  const FetchPublicaciones = async () => {
    try {
      setLoading(true);

      // 1. Obtener info base
      const [fundacion, publicacionesRes, OnFollow, FollowCount] = await Promise.all([
        Foundations.GetfoundationInfo(IdFoundation),
        Foundations.getfoundationPublication(IdFoundation),
        Follow.getOnfollow(IdFoundation),
        Follow.getCountFollow(IdFoundation)
      ]);

      setFoundationsInfo(fundacion);
      setPublicaciones(publicacionesRes);
      setOnFollow(OnFollow);
      setFollowCount(FollowCount);

      const ids = publicacionesRes.content.map((p) => p.id);

      const likes = await Like.GetMultipleLikerCount(ids);
      const likeMap: Record<number, number> = {};
      ids.forEach((id, index) => {
        likeMap[id] = likes[index]?.result ?? 0;
      });
      setLikecounts(likeMap);

      // 4. Saber si el usuario dio like
      const likeTrueMap: Record<number, boolean> = {};
      await Promise.all(
        ids.map(async (id) => {
          try {
            const res = await Like.GetLikeTrue(id);
            likeTrueMap[id] = res.result;
          } catch {
            likeTrueMap[id] = false;
          }
        })
      );
      setLikedMap(likeTrueMap);
    } catch (error) {
      console.error("Error en FetchPublicaciones:", error);
      Toast.show({
        type: 'error',
        text1: 'Error al cargar publicaciones o datos de la fundación',
      });
    } finally {
      setLoading(false);
    }
  };

  FetchPublicaciones();
}, []);


  const handlerFollowToggle = ()=>{
   const isFollowing = OnFollows?.result;

    setOnFollow({ result: !isFollowing });

    setFollowCount((prev) => ({
      ...prev!,
      result: prev!.result + (isFollowing ? -1 : 1),
    }));

    const promise = isFollowing
      ? Follow.DeleteFollow(IdFoundation)
      : Follow.PostFollow(IdFoundation);

    promise.then(
        () => {
         Toast.show({
            type:'success',
            text1: 'Comenzo a seguir'
            })
            },
  );
  };

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

    return (
    <AppScreen title="Perfil de Fundación">
        
      <SafeAreaView className="bg-white px-5 py-8 ">
          
        {foundationsInfo &&
          <FoundationProfile
            foundaction={foundationsInfo}
            OnFollow={OnFollows?.result ?? false}
            FollowerCount={FollowsCount?.result ?? 0}
            Follower={handlerFollowToggle}
            >
          </FoundationProfile>}
          
        <ScrollView className="p-4 mt-2">
          {publicaciones?.content.map((publicacion)=>(
            
            <PublicationCard
                key={publicacion.id}
                publicacion={publicacion}
                liked={likedMap[publicacion.id]}
                likeCount={likecounts[publicacion.id]}
                onLike={handleLikeToggle}
                onOpenComments={handleOpenComments}
            >    
            </PublicationCard>  
          ))} 
        </ScrollView>

        <BottomSheets ref={sheetRef} title="Comentarios">

             <PageComments
                content={comentarios.content}
                publicacionId={idPublicacionActual}
                onCommentPosted={reloadComments}
                />

            </BottomSheets>

      </SafeAreaView>
    </AppScreen>  
    )
}