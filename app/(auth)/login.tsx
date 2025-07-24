import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { useAuthContext } from '~/contexts/AuthContext';
import { Input } from '~/components/io/input/Input';
import { PasswordInput } from '~/components/io/input/PasswordInput';
import { Button } from '~/components/Button';
import { LoginSchema } from '~/schemas/AuthSchema';
import { UserPasswordLogin } from '~/domain/models/auth/login';

export default function Login() {
  const { authenticate } = useAuthContext();
  const router = useRouter();
  const { control, handleSubmit } = useForm<UserPasswordLogin>({
    resolver: yupResolver(LoginSchema),
    reValidateMode: 'onChange',
  });

  const onSubmit = async ({ username, password }: UserPasswordLogin) => {
    try {
      authenticate({ username, password });
      router.replace('/');
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error de login',
        text2: 'Usuario o contraseña incorrectos',
      });
    }
  };

  return (
    <View className="relative flex-1 bg-[#0f766e]">
      <View className="absolute left-[-40] top-[-80] h-64 w-64 rounded-full bg-emerald-500 opacity-20" />
      <View className="absolute bottom-[-40] right-[-20] h-40 w-40 rounded-full bg-emerald-300 opacity-20" />
      <View className="absolute bottom-[80] left-[20] h-32 w-32 rounded-full bg-emerald-400 opacity-10" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="px-6">
          <View className="flex-1 items-center justify-center py-12">
            <View className="w-full max-w-md space-y-6 rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-md">
              <View className="items-center">
                <Image
                  source={require('assets/paw-icon.png')}
                  className="mb-4 h-20 w-20"
                  resizeMode="contain"
                />
                <Text className="text-3xl font-bold text-gray-800">Iniciar sesión</Text>
                <Text className="text-base text-gray-500">Bienvenido de vuelta a ResqPet</Text>
              </View>

              <Input
                control={control}
                name="username"
                placeholder="Usuario"
                autoCapitalize="none"
                inputClass="bg-white border border-gray-300 rounded-xl px-4 py-3 focus:border-teal-500"
                placeholderTextColor="#94a3b8"
              />

              <PasswordInput
                control={control}
                name="password"
                placeholder="Contraseña"
                inputClass="bg-white border border-gray-300 rounded-xl px-4 py-3 focus:border-teal-500"
                placeholderTextColor="#94a3b8"
              />

              <View className="w-full items-end">
                <TouchableOpacity
                  className="px-2 py-1"
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text className="text-sm font-medium text-teal-600">¿Olvidó su contraseña?</Text>
                </TouchableOpacity>
              </View>

              <Button
                title="Entrar"
                onPress={handleSubmit(onSubmit)}
                className="rounded-full bg-teal-600 py-3 text-base font-semibold text-white shadow-md"
              />

              <View className="flex-row justify-center">
                <Text className="text-sm text-gray-600">¿Aún no tienes cuenta? </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                  <Text className="text-sm font-semibold text-teal-700">¡Regístrate!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
