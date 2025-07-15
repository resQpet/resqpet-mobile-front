import '../global.css';
import {AuthProvider} from '~/contexts/AuthContext';
import {Slot} from 'expo-router';
import { LocationProvider } from '~/contexts/LocationContext';

export default function RootLayout() {
    return (

        <AuthProvider> 
            <LocationProvider>
                 <Slot/>
            </LocationProvider>
            </AuthProvider>
       
            
        
        
    );
}