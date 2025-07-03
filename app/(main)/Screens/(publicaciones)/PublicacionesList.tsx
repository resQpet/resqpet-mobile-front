import {Button} from '~/components/Button';
import {useAuthContext} from '~/contexts/AuthContext';
import {Text, View,ScrollView, ActivityIndicator,Image} from 'react-native';
import {AppScreen} from '~/components/AppScreen';
import SidebarMenu from "~/components/SidebarMenu";
import { Publicaciones } from '~/domain/model/publicaciones/publicaciones';
import { useEffect,useState } from 'react';
import { publicationsService } from '~/services/publicaciones/Publicaciones';

export default function PublicacionesList() {
    const {logout} = useAuthContext();
     
const [publicaciones, setPublicaciones] = useState<Publicaciones | null>(null);
    const [loading, setLoading] = useState(true);
 
    useEffect(()=>{
        const FetchPublicaciones = async () => {
            try{
                const res = await publicationsService.instance.GetPublicaciones(20);
                setPublicaciones(res);
            }
            catch(e){
                console.error("error al cargar",e)
            
            }
            finally{
                setLoading(false)
            } 
        } 
        FetchPublicaciones();
    },[])
 


    if (loading){
        return(
             <View className="flex-1 justify-center items-center bg-white px-6">
                <Text className="text-lg mt-4 text-gray-600">Cargando publicaciones...</Text>
                <ActivityIndicator size="large" color="#4b5563" className="mt-4" />
            </View>
        )
    }

    return (
       <AppScreen title="publicaciones">
        <ScrollView className="bg-white px-4 py-6">
              {publicaciones?.content.map((publicacion) => (
                <View
                    key={publicacion.id}
                    className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm"
                >
                    <View className="flex-row items-center space-x-2 mb-2">
                    <View className="w-6 h-6 bg-amber-500 rounded-full items-center justify-center">
                        <Text className="text-xs text-white font-bold">
                        {publicacion.foundation.name.charAt(0)}
                        </Text>
                    </View>
                    <Text className="text-sm text-gray-800 font-medium">
                        {publicacion.foundation.name}
                    </Text>
                    
                    </View>
                    
                    <Text className="text-lg font-semibold text-gray-900 mb-1">
                    {publicacion.title}
                    </Text>

                   
                    <Text className="text-gray-700 mb-2">{publicacion.content}</Text>


                    {publicacion.images?.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {publicacion.images?.length > 0 && (
                           <View className='items-center '>
                            <Image
                                source={{ uri: publicacion.images[0].imageUrl }}
                                className='w-[270px] h-[160px] mb-1 rounded-md'
                                resizeMode="cover"
                              />
                            </View>
                            )}
                                
                    </ScrollView>
          
        )}
                    <Text className="text-sm text-right text-gray-400 mb-4">
                        {new Date(publicacion.eventDate).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',})}
                    </Text>
      </View>
      
    ))}
    
    
  </ScrollView>



            <SidebarMenu/>
        
        </AppScreen>
    );
}
