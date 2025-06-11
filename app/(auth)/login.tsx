import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuthStore} from '~/store/authStore';
import {UserPasswordLogin} from '~/domain/model/auth/login';
import {AuthService} from '~/services/auth/authService';
import {PasswordInput} from '~/components/io/input/PasswordInput';
import {LoginSchema} from '~/schemas/authSchema';
import Toast from 'react-native-toast-message';
import {useRouter} from 'expo-router';
import {Input} from "~/components/io/input/Input";
import {Text, View} from "react-native";
import {Button} from "~/components/Button";

const authService: AuthService = AuthService.instance;

export default function Login() {

    const router = useRouter();

    const {control, handleSubmit} = useForm<UserPasswordLogin>({
        resolver: yupResolver(LoginSchema),
    });

    const onSubmit = async (data: UserPasswordLogin) => {
        try {
            await useAuthStore.getState().loadToken();

            Toast.show({
                type: 'success',
                text1: 'Login correcto',
            });

            router.replace('/');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error de login',
                text2: 'Usuario o contraseña incorrectos',
            });
        }
    };

    return (
        <View className="flex-1 justify-center p-4 bg-gray-100">
            <Text className="items-center justify-center text-xl font-bold">Login</Text>
            <Input control={control} name="username" placeholder="Usuario" autoCapitalize="none"/>
            <PasswordInput control={control} name="password" placeholder="Contraseña"/>
            <Button title="Iniciar sesión" onPress={handleSubmit(onSubmit)}/>
            <Button title="Crear cuenta nueva" onPress={() => router.push('/(auth)/register')} />
        </View>
    );
}