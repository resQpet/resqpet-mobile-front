import {Button} from '~/components/Button';
import {useAuthContext} from '~/contexts/AuthContext';
import {Text} from 'react-native';
import {AppScreen} from '~/components/AppScreen';
import SidebarMenu from "~/components/SidebarMenu";

export default function About() {
    const {logout} = useAuthContext();

    return (
        <AppScreen title="About">
            <Text className="text-gray-700 leading-relaxed">
                Buenas tardes
            </Text>
            <SidebarMenu/>
            <Button title="Cerrar sesión" onPress={logout}/>
        </AppScreen>
    );
}
