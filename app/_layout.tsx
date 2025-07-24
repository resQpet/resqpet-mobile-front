import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import '../global.css';
import { AuthProvider } from '~/contexts/AuthContext';
import { LocationProvider } from '~/contexts/LocationContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LocationProvider>
        <AuthProvider>
          <Slot />
          <Toast />
        </AuthProvider>
      </LocationProvider>
    </GestureHandlerRootView>
  );
}
