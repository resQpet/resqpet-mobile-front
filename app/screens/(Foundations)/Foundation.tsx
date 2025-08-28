import { View,Text,Button, TouchableOpacity, } from "react-native";
import React,{useEffect,useState} from "react";
import HeaderBar from "~/components/HeaderBar";
import { FoundationService } from "~/services/fundaciones/foundations/FoundationService";
import { TiposDeFundaciones } from "~/components/Foundation/TypeFoundation";
import { Foundation, Foundations } from "~/domain/models/foundations/Foundation";
import { Fundaciones } from "~/components/Foundation/FoundationList";
import { ScrollView } from "react-native-gesture-handler";
import { TypeFoundations } from "~/domain/models/foundations/typeFoundation";
const FoundationsALL = FoundationService.instance;

export default function FoundationScrenn (){

      const [mostrar, setMostrar] = useState<'fundaciones' | 'tipos'>('fundaciones');
      const [foundationsInfo, setFoundationsInfo] = useState<Foundations | null>(null)
      const [foundationsType, setFoundationsType] = useState<TypeFoundations| null>(null)

    useEffect(()=>{
        FoundationsALL.GetFundaciones().then(setFoundationsInfo);
        FoundationsALL.GetTypeFoundations().then(setFoundationsType);

    },[])

    return (
      <View style={{ flex: 1 }}>
      <HeaderBar />
      <View style={{ flex: 1, padding: 16 }}>
        <View className="flex-row justify-around mb-5">
          <TouchableOpacity
            onPress={() => setMostrar('fundaciones')}
            className={`px-4 py-2 rounded-full ${
              mostrar === 'fundaciones'
                ? 'bg-blue-600'
                : 'bg-white border border-gray-300'
            }`}
          >
            <Text
              className={`text-base font-semibold ${
                mostrar === 'fundaciones' ? 'text-white' : 'text-gray-700'
              }`}
            >
              Fundaciones
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMostrar('tipos')}
            className={`px-4 py-2 rounded-full ${
              mostrar === 'tipos'
                ? 'bg-blue-600'
                : 'bg-white border border-gray-300'
            }`}
          >
            <Text
              className={`text-base font-semibold ${
                mostrar === 'tipos' ? 'text-white' : 'text-gray-700'
              }`}
            >
              Tipos de Fundaciones
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {mostrar === 'fundaciones' ? (
            <>
              {foundationsInfo?.content?.map((foundation) => (
                <Fundaciones key={foundation.id} foundation={foundation} />
              ))}
            </>
          ) : (
            <>
              {foundationsType?.content.map((TipoFundaciones) => (
                <TiposDeFundaciones
                  key={TipoFundaciones.id}
                  TypeFoundation={TipoFundaciones}
                />
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
