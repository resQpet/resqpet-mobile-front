import { View,Text,Image,ScrollView} from "react-native";
import { useState,useEffect } from "react";
import { FundacionesService } from "~/services/fundaciones/fundaciones";
import { Fundaciones } from "~/domain/model/fundaciones/fundaciones";
import { AppScreen } from "~/components/AppScreen";
import { Input } from "~/components/io/input/Input";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {UserPasswordLogin} from '~/domain/model/auth/login';
import {LoginSchema} from '~/schemas/authSchema';

export default function fundacionesList () {

    const [fundaciones,setFundaciones] = useState<Fundaciones | null>(null);
    const [loading, setLoading] = useState(true)


const {control, handleSubmit} = useForm<UserPasswordLogin>({
        resolver: yupResolver(LoginSchema),
    });
    useEffect(()=>{
    const FetchFundaciones = async () =>{
        try{
            const res = await FundacionesService.instance.GetFundaciones();
            setFundaciones(res);

        }catch(e){
            console.log('error',e)
        }
        finally{
            setLoading(false);
        }
    }
    FetchFundaciones();
    },[])



    return (
              <AppScreen title="Fundaciones">
                <View className="flex-1 bg-white">
                    <View>
                        <Input className='rounded-md'control={control} name="username" placeholder="Usuario" autoCapitalize="none"/>
                    </View>
                      <ScrollView className="flex-1 bg-white px-2 py-6">
                        {fundaciones?.content.map((fundacion) => (
                        <View
                            key={fundacion.id}
                            className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm"
                        >
                            <View className="flex-row items-center space-x-2 mb-2">


                           
                            <View className="w-12 h-12 bg-amber-500 rounded-full items-center justify-center">
                                <Text className="text-lg text-white font-bold">
                                {fundacion.name.charAt(0)}
                                </Text>
                            </View>

                            <Text className="text-xl font-semibold text-gray-800">
                                {fundacion.name}
                            </Text>
                            </View>

                            
                            <View className="mb-3">
                            <Text className="text-sm text-gray-500">Correo electrónico</Text>
                            <Text className="text-base text-gray-700">{fundacion.email}</Text>
                            </View>

                           
                            <View>
                            <Text className="text-sm text-gray-500">Teléfono</Text>
                            <Text className="text-base text-gray-700">{fundacion.phone}</Text>
                            </View>
                        </View>
                        
                            
                        ))}
                    </ScrollView>
                    
                </View>


</AppScreen>

    )




}