import { Button, Text } from 'react-native';
import { AppScreen } from '~/components/AppScreen';
import { useAuthContext } from '~/contexts/AuthContext';

export default function About() {
  const { logout } = useAuthContext();

  return (
    <AppScreen title="About">
      <Text className="leading-relaxed text-gray-700">Buenas tardes</Text>
      <Button title="Cerrar sesión" onPress={logout} />
    </AppScreen>
  );
}
