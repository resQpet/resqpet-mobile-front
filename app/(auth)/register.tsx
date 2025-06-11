import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {RegisterUser} from '~/domain/model/auth/register';
import {RegisterSchema} from '~/schemas/authSchema';
import {PasswordInput} from '~/components/io/input/PasswordInput';
import Toast from 'react-native-toast-message';
import {useRouter} from 'expo-router';
import {Input} from '~/components/io/input/Input';

import {KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import {Button} from "~/components/Button";
import {UserService} from "~/services/users/userService";

const userService: UserService = UserService.instance;

export default function Register() {
    const {control, handleSubmit} = useForm<RegisterUser>({
        resolver: yupResolver(RegisterSchema),
    });

    const router = useRouter();

    const onSubmit = async (data: RegisterUser) => {
        try {
            await userService.register(data);

            Toast.show({
                type: 'success',
                text1: 'Registro exitoso',
                text2: 'Puedes iniciar sesión ahora',
            });

            router.replace('/(auth)/login');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error de registro',
                text2: 'No se pudo crear el usuario',
            });
        }
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-gray-100"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={80}
        >
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text className="text-xl font-bold mb-4 text-center">Registro</Text>

                <Input control={control} name="username" placeholder="Usuario" />
                <PasswordInput control={control} name="password" placeholder="Contraseña" />
                <Input control={control} name="document" placeholder="Documento" />
                <Input control={control} name="email" placeholder="Correo electrónico" />
                <Input control={control} name="roleId" placeholder="ID del Rol" />
                <Input control={control} name="userInfo.firstName" placeholder="Nombre" />
                <Input control={control} name="userInfo.lastName" placeholder="Apellido" />
                <Input control={control} name="userInfo.gender" placeholder="Género (MALE o FEMALE)" />
                <Input control={control} name="userInfo.country" placeholder="País" />
                <Input control={control} name="userInfo.city" placeholder="Ciudad" />
                <Input control={control} name="userInfo.birthDate" placeholder="Fecha de nacimiento (DD-MM-YYYY)" />
                <Input control={control} name="userInfo.image" placeholder="URL Imagen" />

                <View className="mt-4">
                    <Button title="Registrarse" onPress={handleSubmit(onSubmit)} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
