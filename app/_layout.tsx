import '../global.css';
import {AuthProvider} from '~/contexts/AuthContext';
import {Slot} from 'expo-router';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Slot/>
        </AuthProvider>
    );
}