import React,{useEffect,useState} from "react";
import { View,Text,  SafeAreaView, TouchableOpacity} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FoundationService } from "~/services/fundaciones/foundations/FoundationService";
import { Foundation } from "~/domain/models/foundations/Foundation";
import { AppScreen } from "~/components/AppScreen";
import { FoundationProfile } from "~/components/Foundation/Profile/ProfileCard";
import Toast from "react-native-toast-message";
import { FollowerServices } from "~/services/fundaciones/foundations/FollowerService";
import { FoundationFollowsCount, OnFollowFoundation } from "~/domain/models/foundations/Follows";
import PublicacionesList from "../../(publicaciones)/PublicacionesList";
import { ChatServices } from "~/services/Chat/chatServices";
import { useRouter } from "expo-router";

const chatService = ChatServices.instance;
const Foundations = FoundationService.instance;
const Follow = FollowerServices.instance;

export default function Profile () {

  const [loading, setLoading] = useState(true);
  const [foundationsInfo, setFoundationsInfo] = useState<Foundation | null>(null)
  const [OnFollows,setOnFollow] = useState <OnFollowFoundation | null >(null);
  const [FollowsCount, setFollowCount] = useState<FoundationFollowsCount | null >(null)
  const { ID } = useLocalSearchParams();
  const IdFoundation = Number(ID);
  const router = useRouter();

  useEffect(() => {
  const FetchPublicaciones = async () => {
    try {
      setLoading(true);

      const [fundacion, OnFollow, FollowCount] = await Promise.all([
        Foundations.GetfoundationInfo(IdFoundation),
        Follow.getOnfollow(IdFoundation),
        Follow.getCountFollow(IdFoundation)
      ]);

      setFoundationsInfo(fundacion);
      setOnFollow(OnFollow);
      setFollowCount(FollowCount);

    } catch (e) {
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
          },);
    };

    const handleCreateChat = () => {
      chatService.CreateChatThread(IdFoundation, "Estoy interesado en adoptar a Luna")
        .then((thread) => {
      
          router.push({
            pathname: "/screens/(Chat)/[ID]/Chat",
            params: { ID: thread.id }
          });
        })
        .catch((err) => {
          Toast.show({
            type: 'error',
            text1: 'No se pudo crear el chat',
          });
    });
};
  
  return (
    <AppScreen title="Perfil de Fundación">
        
      <SafeAreaView className="flex-1 bg-white px-5 py-8  ">
          
        {foundationsInfo && (
            <FoundationProfile
              foundaction={foundationsInfo}
              OnFollow={OnFollows?.result ?? false}
              FollowerCount={FollowsCount?.result ?? 0}
              Follower={handlerFollowToggle}
              onCreateChat={handleCreateChat} 
            />
          )}

        <View className="flex-1 py-1 rounder-full">
          <PublicacionesList key={foundationsInfo?.id} IdFoundation={foundationsInfo?.id}/>
        </View>
      
      </SafeAreaView>
    </AppScreen>  
    )
}