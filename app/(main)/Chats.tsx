import React, { useEffect,  useState } from "react";
import {View,Text,Image,ScrollView,TouchableOpacity, ActivityIndicator, SafeAreaView} from "react-native";
import { useRouter } from "expo-router";
import { Chats } from "~/domain/models/Chat/ChatList";
import { ChatServices } from "~/services/Chat/chatServices";
import { AppScreen } from "~/components/AppScreen";
import { UserService } from "~/services/users/UserService";
import { User } from "~/domain/models/users/user";

const allChat = ChatServices.instance;
const UserSER = UserService.instance;

export  default function ChatBotScreen  () {

  const [chat, setchat] = useState<Chats | null>(null);
  const [loading, setLoading] = useState(true);
  const [UserInfo, setUserInfo] = useState<User | null>(null);
  const Router = useRouter();

  useEffect(() => {
  UserSER.current().then((user) => {
    if (!user?.id) return;
    setUserInfo(user);

    allChat.GetAllChat(user.id).then((data) => {
      setchat(data);
      setLoading(false);
    });
  });
  }, []);

  if (loading) {
      return (
        <View className="flex-1 justify-center items-center" >
          <ActivityIndicator size="large" color="#198754" />
        </View>
      ); 
    }

  return (
  <AppScreen title="chat">
    <SafeAreaView className="flex-1 bg-white px-5 py-8">
      <Text className="text-2xl font-bold text-center mb-2 text-blue-600">
        Lista de Chats
      </Text>
      <ScrollView className="flex-1 bg-white p-4">
        {chat?.content && chat.content.length > 0 ? (
          chat.content.map(({ id, subject, user, foundation }) => (
            <TouchableOpacity
              key={id}
              className="flex-row items-center bg-gray-100 p-4 rounded-xl mb-3"
              onPress={() => {
                Router.push({
                  pathname: "/screens/(Chat)/[ID]/Chat",
                  params: { ID: id.toString() },
                });
              }}
            >
              {foundation.logo && (
                <Image
                  source={{ uri: foundation.logo }}
                  className="h-20 w-20 rounded-xl mr-4"
                  resizeMode="cover"
                />
              )}

              <View className="flex-1 space-y-1">
                <Text className="text-lg font-bold text-gray-900">
                  {foundation.name}
                </Text>
                <Text className="text-sm text-gray-600 font-semibold">
                  {subject}
                </Text>
                <Text className="text-xs text-gray-500">
                  Enviado por: {user.username}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text className="text-center text-gray-400 mt-10">
            No hay chats disponibles.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  </AppScreen>
)
}
