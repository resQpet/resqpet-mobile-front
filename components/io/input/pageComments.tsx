import { Text, View,TouchableOpacity } from "react-native"
import { Comments,CreateComment } from "~/domain/model/publicaciones/Comment";
import { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Comment } from "~/services/publicaciones/CommentService";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";

interface Props extends Comments {
  publicacionId?: number;
}

const Pagecomments = ({ content = [], publicacionId }: Props )=>{

    const Comments= Comment.instance;
    const [showReplies,selfshowReplis] = useState(false);
    const [Comentario, setComentario] = useState('')
    const [comentarioPadre, setComentarioPadre] = useState<number | null>(null); 
    const [updateCommentId, setUpdateCommentId] = useState<number | null>(null); 

    const hanbdelecommentpost = (publicacionId?: number) =>{
         if (!publicacionId) return;

        const nuevoComentario: CreateComment = {
            publicationId: publicacionId,
            content: Comentario,
        ...(comentarioPadre && { parentCommentId: comentarioPadre })};
         
        Comments.PostComment(nuevoComentario).then(()=>{
                setComentario('');
                setComentarioPadre(null);
        })
    }

    const handleInactivateComment = (commentId: number) => {
        if (!publicacionId) return;

        Comments.InativeComment(commentId)
        .then(() => {
            Toast.show({
                type: 'success',
                text1: 'Comentario inactivado correctamente'
            });
        }) 
    };
    
    return (
        <BottomSheetScrollView>
                {content.map((Comentarios)=>(
                    <View
                    key={Comentarios.id}
                    className="p-4 border-b border-gray-200">
                    <View className="flex-row items-center space-x-2 mb-2">
                        <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                            <Text className="text-xs text-white font-bold">
                                {Comentarios.user.username.charAt(0)}
                            </Text>
                        </View>
                        <Text className="p-2">{Comentarios.user.username}</Text>
                    </View>

                    <View className="flex-row justify-between items-center w-full mb-2">
                        <Text>
                            {Comentarios.content}
                        </Text>

                        <TouchableOpacity onPress={() => handleInactivateComment(Comentarios.id)}>
                            <Ionicons name="close-circle-outline"
                             size={30}
                              color="black" />
                        </TouchableOpacity>
                    </View>

                    {Comentarios.replies && Comentarios.replies.length > 0 && (
                        <TouchableOpacity onPress={()=>selfshowReplis(!showReplies)} className="self-center mb-2" >
                             <Text>replies</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={() => setComentarioPadre(Comentarios.id)} 
                        className="self-start mt-2"
                        >
                        <Text className="text-blue-500">Responder</Text>
                    </TouchableOpacity>

                    {showReplies && Comentarios.replies?.map((replies)=>(
                        <View
                        key={replies.id}
                        className="p-4">
                            <View className="flex-row items-center space-x-2 mb-2">
                                <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                                    <Text className="text-xs text-white font-bold">
                                        {replies.user.username.charAt(0)}
                                    </Text>
                                </View>
                            <Text className="p-2 items-right">{replies.user.username}</Text>
                            </View>
                            <Text className="items-right">{replies.content}</Text>
                        </View>        
                        ))}

                    </View>
                ))}

                {comentarioPadre && (
                    <View className="px-4 mb-2">
                        <View className="bg-gray-100 p-2 rounded-md flex-row justify-between items-center">
                        <Text className="text-gray-600 text-sm">Respondiendo a un comentario</Text>
                        <TouchableOpacity onPress={() => setComentarioPadre(null)}>
                            <Text className="text-red-500 text-sm ml-4">Cancelar</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    )}
                    
                <View className="flex-row items-center mb-6 space-x-2 px-4">
                    
                    <BottomSheetTextInput
                        placeholder="comentar" 
                        className="flex-1 p-4 border border-gray-200 rounded-full shadow-sm"
                        value={Comentario}
                        onChangeText={setComentario}
                        >
                    </BottomSheetTextInput>

                    {Comentario.trim().length > 0 && (
                        <TouchableOpacity
                            className="self-center mb-2"
                            onPress={()=>{hanbdelecommentpost(publicacionId)}}
                            disabled={!Comentario.trim()}
                            >
                            <Ionicons name='arrow-up-circle-outline'
                                size={35}
                                color='blue'/>
                        </TouchableOpacity>
                    )}
                </View>
        </BottomSheetScrollView>     
  );
}

export default Pagecomments;