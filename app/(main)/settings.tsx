// app/settings.tsx
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthContext } from '~/contexts/AuthContext';
import { useEffect, useState} from 'react';
import { UserService } from '~/services/users/UserService';
import { User } from '~/domain/models/users/user';

const UserSER = UserService.instance;

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuthContext();
  const [UserInfo, setUserInfo] = useState<User | null>(null);

  useEffect(()=>{
   UserSER.current().then(setUserInfo)
  },[])

  const user = {
    name: UserInfo?.username,
    email: UserInfo?.email,
    avatar: UserInfo?.info.image,
  };

  const menuOptions = [
    {
      icon: 'heart-outline',
      title: 'Fundaciones que sigues',
      description: 'Mira las fundaciones a las que sigues',
      onPress: () => router.push('/search'),
    },
    {
      icon: 'people-outline',
      title: 'Fundaciones a las que perteneces',
      description: 'Gestiona tus fundaciones',
      onPress: () => router.push('/screens/(Foundations)/(myFoundation)/myFoundation'),
    },
    {
      icon: 'log-out-outline',
      title: 'Cerrar sesión',
      description: 'Salir de tu cuenta',
      danger: true,
      onPress: () =>
        Alert.alert('Cerrar sesión', '¿Seguro que deseas salir?', [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Salir',
            style: 'destructive',
            onPress: () => {
              if (logout) {
                logout();
              }
            },
          },
        ]),
    },
  ];

  return (
    <View className="flex-1 bg-slate-50">
      {/* HEADER */}
      <View className="elevation-2 flex-row items-center bg-white px-6 py-9 shadow-sm">
        <Text className="flex-1 text-2xl font-bold text-slate-800">Menú</Text>
      </View>

      {/* CONTENIDO */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {/* Info usuario */}
        <View className="mx-4 mb-4 mt-8 flex-row items-center rounded-2xl bg-white px-5 py-4 shadow">
          <Image source={{ uri: user.avatar }} className="mr-4 h-16 w-16 rounded-full" />
          <View className="flex-1">
            <Text className="text-lg font-bold">{user.name}</Text>
            <Text className="text-sm text-slate-500">{user.email}</Text>
          </View>
        </View>

        {/* Opciones menú */}
        <View className="mx-4 divide-y divide-slate-100 rounded-2xl bg-white py-2 shadow">
          {menuOptions.map((option) => (
            <Pressable
              key={option.title}
              className={`flex-row items-center px-5 py-4 ${option.danger ? 'bg-red-50' : ''}`}
              onPress={option.onPress}>
              <Ionicons
                name={option.icon as any}
                size={26}
                color={option.danger ? '#ef4444' : '#0f766e'}
                style={{ marginRight: 16 }}
              />
              <View className="flex-1">
                <Text
                  className={`text-base font-semibold ${
                    option.danger ? 'text-red-500' : 'text-slate-800'
                  }`}>
                  {option.title}
                </Text>
                <Text className="mt-1 text-xs text-slate-500">{option.description}</Text>
              </View>
              {!option.danger && <Ionicons name="chevron-forward" size={22} color="#94a3b8" />}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
