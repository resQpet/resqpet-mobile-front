import { Foundation } from "~/domain/models/foundations/Foundation";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

type Props = {
  foundaction: Foundation;
  FollowerCount: number;
  OnFollow : boolean;
  Follower : (id : number )=>void;
  onCreateChat?: () => void;  
};

export const FoundationProfile = ({foundaction, OnFollow,FollowerCount,Follower,onCreateChat}: Props) => {

  const Router = useRouter();

  return (
    <View
      key={foundaction.id}
      className="bg-white p-3 rounded-xl shadow-md shadow-black/20"
    >
      <View>
        <TouchableOpacity onPress={() => { Router.push('/') }}>
          <Ionicons
            name='arrow-back-circle-outline'
            size={30}
          />
        </TouchableOpacity>
      </View>

      <View className="items-center mb-4">

        {foundaction.logo && (
          <Image
            className="h-24 w-24 rounded-full mb-2"
            source={{ uri: foundaction.logo }}
          />
        )}
        <Text className="text-xl font-bold text-gray-800 text-center">
          {foundaction.name}
        </Text>
      </View>

      <View className="space-y-3">
        <Text className="text-base text-gray-600 flex-row">
          <Ionicons name="globe-outline" size={16} color="#4B5563" />{" "}
          <Text className="text-blue-500 underline">
            {foundaction.website || "No disponible"}
          </Text>
        </Text>

        <Text className="text-base text-gray-600">
          <Ionicons name="mail-outline" size={16} color="#4B5563" />{" "}
          <Text className="text-gray-800">{foundaction.email || "No disponible"}</Text>
        </Text>

        <Text className="text-base text-gray-600">
          <Ionicons name="call-outline" size={16} color="#4B5563" />{" "}
          <Text className="text-gray-800">{foundaction.phone || "No disponible"}</Text>
        </Text>

        <Text className="text-base text-gray-600">
          <Ionicons name="location-outline" size={16} color="#4B5563" />{" "}
          <Text className="text-gray-800">
            {foundaction.locations?.city || "No disponible"}
          </Text>
        </Text>

        <TouchableOpacity className={`px-6 py-3 rounded-full ${
          OnFollow ? "bg-gray-400" : "bg-green-500"
        }`}
          onPress={() => { Follower(foundaction.id) }}
        >
          <Text className="text-center">{OnFollow ? 'seguidores' : 'Seguir'} {FollowerCount}</Text>
        </TouchableOpacity>

        {onCreateChat && (
          <TouchableOpacity
            onPress={onCreateChat}
            className="mt-3 bg-blue-500 p-3 rounded-full"
          >
            <Text className="text-white text-center">Enviar mensaje</Text>
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
};
