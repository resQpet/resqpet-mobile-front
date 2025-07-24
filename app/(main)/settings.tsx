import { Text } from 'react-native';
import { AppScreen } from '~/components/AppScreen';

export default function SettingsScreen() {
  return (
    <AppScreen title="Configuración">
      <Text className="text-gray-700">Pantalla de ajustes.</Text>
    </AppScreen>
  );
}
