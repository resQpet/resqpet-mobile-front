import '../global.css';
import {AuthProvider} from '~/contexts/AuthContext';
import {Slot} from 'expo-router';
import { LocationProvider } from '~/contexts/LocationContext';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
    return (
        <LocationProvider>
             <AuthProvider> 
                 <Slot/>
                 <Toast/>
            </AuthProvider>
       </LocationProvider>
    );
}