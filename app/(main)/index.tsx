import { Text } from 'react-native';
import PublicacionesList from '~/app/screens/(publicaciones)/PublicacionesList';
import { useAuthContext } from '~/contexts/AuthContext';
import { AppScreen } from '~/components/AppScreen';
import { Button } from '~/components/Button';

export default function Home() {
  const { logout } = useAuthContext();

  return (
    <AppScreen title="Inicio">
      <Text className="leading-relaxed text-gray-700">
        ResqPet es una plataforma diseñada para gestionar el rescate, adopción y cuidado de mascotas.
      </Text>
      <PublicacionesList/>
      <Button title="Cerrar sesión" onPress={logout} />
    </AppScreen>
  );
}
