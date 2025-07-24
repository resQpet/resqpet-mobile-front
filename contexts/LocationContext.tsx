import React, { createContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { LocationContextType } from '~/domain/models/Location/location';

const LocationContext = createContext<LocationContextType>({
  latitude: null,
  longitude: null,
  refreshLocation: async () => {},
});

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [latitude] = useState<number | null>(null);
  const [longitude] = useState<number | null>(null);

  useEffect(() => {
    checkIfLocationEnabled().then((r) => console.log(r));
    getCurrentLocation().then((r) => console.log(r));
  }, []);

  const checkIfLocationEnabled = async () => {
    const enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert('Location not enabled', 'Please enable your Location', [
        {
          text: 'Cancel',
          onPress: () => Toast.show({ text1: 'Cancel Pressed' }),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => Toast.show({ text1: 'OK Pressed' }) },
      ]);
    }
  };

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Debes permitir el acceso a la localización');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;

    await SecureStore.setItemAsync('latitud', lat.toString());
    await SecureStore.setItemAsync('longitud', lng.toString());
  };

  return (
    <LocationContext.Provider value={{ latitude, longitude, refreshLocation: getCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
