import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { Foundation } from '~/domain/models/foundations/Foundation';
import { AppScreen } from '~/components/AppScreen';
import { FoundationService } from '~/services/fundaciones/foundations/FoundationService';

export default function FoundationList() {
  const [foundations, setFoundations] = useState<Foundation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FoundationService.instance.search('').then((data) => {
      setFoundations(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="mt-4 text-lg text-gray-600">Cargando fundaciones...</Text>
        <ActivityIndicator size="large" color="#4b5563" className="mt-4" />
      </View>
    );
  }

  return (
    <AppScreen title="Fundaciones">
      <ScrollView className="bg-white px-4 py-6">
        {foundations.map((foundation) => (
          <View
            key={foundation.id}
            className="mb-3 flex-row items-center rounded-xl bg-white p-3 shadow dark:bg-zinc-800">
            <Image
              source={{
                uri:
                  foundation.logo ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                    foundation.name
                  )}`,
              }}
              className="mr-3 h-12 w-12 rounded-full bg-gray-200"
              resizeMode="cover"
            />
            <View>
              <Text className="text-sm font-semibold text-black dark:text-white">
                {foundation.name}
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                {foundation.locations?.city}, {foundation.locations?.country}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </AppScreen>
  );
}
