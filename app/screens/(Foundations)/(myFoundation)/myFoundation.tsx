import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Foundation } from "~/domain/models/foundations/Foundation";
import { User } from "~/domain/models/users/user";
import { UserService } from "~/services/users/UserService";

export default function FoundationsListScreen() {
  const [foundations, setFoundations] = useState<Foundation[]>([]);
  const Router = useRouter();

  useEffect(() => {
    UserService.instance.current()
      .then((user: User) => {
        const list = user.roles.map((r) => r.foundation);
        setFoundations(list);
      })
      .catch(console.error);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Botón de home */}
      <View className="px-4 pt-4">
        <TouchableOpacity onPress={() => Router.push("/(main)/settings")}>
          <Ionicons name="arrow-back-circle" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-3">Mis Fundaciones</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {foundations.length > 0 ? (
            foundations.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="flex-row items-center bg-gray-100 p-3 mb-2 rounded-lg"
                onPress={() => {
                  Router.push({
                    pathname: "/screens/(Profile)/[ID]/Profile",
                    params: { ID: item.id.toString() },
                  });
                }}
              >
                <Image
                  source={{ uri: item.logo }}
                  className="w-12 h-12 mr-3 rounded-full"
                />
                <View>
                  <Text className="text-base font-bold">{item.name}</Text>
                  <Text className="text-sm text-gray-600">{item.email}</Text>
                  <Text className="text-sm text-gray-600">{item.locations?.city}</Text>
                  <Text className="text-xs text-green-600">Estado: {item.status}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text className="text-center text-gray-400 mt-10">
              No tienes fundaciones asignadas.
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
