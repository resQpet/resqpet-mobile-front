import {Button} from '~/components/Button';
import {useAuthContext} from '~/contexts/AuthContext';
import {Text} from 'react-native';
import {AppScreen} from '~/components/AppScreen';
import SidebarMenu from "~/components/SidebarMenu";

export default function Home() {
    const {logout} = useAuthContext();

    return (
        <AppScreen title="Home">
            <Text className="text-gray-700 leading-relaxed">
                ResqPet es una plataforma diseñada para gestionar el rescate, adopción y cuidado de mascotas.
            </Text>
            <SidebarMenu/>
            <Button title="Cerrar sesión" onPress={logout}/>
        </AppScreen>
    );
}
