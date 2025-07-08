
import * as Location from 'expo-location'
import { Alert } from 'react-native';
import { CodLocation } from '~/domain/model/Location/Location';


export class Locations {

    private static factory :Locations = new Locations();

    static get instance(): Locations{
        return Locations.factory;
    }


    async getLocation(): Promise<CodLocation| undefined>{
     try {
      const enabled = await Location.hasServicesEnabledAsync();

      if (!enabled) {
        Alert.alert('Activa la localización', '', [
          { text: 'Cancelar', onPress: () => console.log('Cancelar'), style: 'cancel' },
          { text: 'OK', onPress: () => console.log('Presionó OK') },
        ]);
        return undefined;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Debes permitir el acceso a la localización', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'OK' },
        ]);
        return undefined;
      }

      const location = await Location.getCurrentPositionAsync({});

        return {
            latitud: location.coords.latitude.toString(),
            longitud: location.coords.longitude.toString()
        };
    } catch (e) {
        console.error('Error al obtener la ubicación:', e);
        return undefined;
    }
  }
        
       
    }
    

        
