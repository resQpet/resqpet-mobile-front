import { Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { Comment } from '~/services/publicaciones/CommentService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { Comments, CreateComment } from '~/domain/models/publication/Comment';

interface Props extends Comments {
  publicacionId?: number;
  onCommentPosted?: () => void;
}

const PageComments = ({ content = [], publicacionId, onCommentPosted }: Props) => {
  const Comments = Comment.instance;
  const [showReplies, setShowReplies] = useState(false);
  const [Comentario, setComentario] = useState('');
  const [comentarioPadre, setComentarioPadre] = useState<number | null>(null);

  const handleCommentPost = async () => {
    if (!publicacionId || !Comentario.trim()) return;

    const nuevoComentario: CreateComment = {
      publicationId: publicacionId,
      content: Comentario.trim(),
      ...(comentarioPadre && { parentCommentId: comentarioPadre }),
    };

    try {
      await Comments.PostComment(nuevoComentario);
      setComentario('');
      setComentarioPadre(null);
      Toast.show({ type: 'success', text1: 'Comentario publicado' });
      onCommentPosted?.();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error al comentar: ' + error,
        text2: 'Intentalo de nuevo',
      });
    }
  };

  const handleInactivateComment = async (commentId: number) => {
    if (!publicacionId) return;

    await Comments.InativeComment(commentId);
    Toast.show({ type: 'success', text1: 'Comentario eliminado' });
    onCommentPosted?.();
  };

  return (
    <BottomSheetScrollView className="bg-white">
      {content.map((comentario) => (
        <View key={comentario.id} className="border-b border-gray-200 px-4 py-3">
          <View className="flex-row items-start gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-500">
              <Text className="text-base font-bold text-white">
                {comentario.user.username.charAt(0)}
              </Text>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="font-semibold text-gray-900">{comentario.user.username}</Text>
                <TouchableOpacity onPress={() => handleInactivateComment(comentario.id)}>
                  <Ionicons name="close-circle-outline" size={22} color="#777" />
                </TouchableOpacity>
              </View>
              <Text className="mt-1 text-gray-800">{comentario.content}</Text>

              <TouchableOpacity onPress={() => setComentarioPadre(comentario.id)} className="mt-2">
                <Text className="text-sm text-blue-500">Responder</Text>
              </TouchableOpacity>

              {comentario.replies!.length > 0 && (
                <TouchableOpacity onPress={() => setShowReplies(!showReplies)} className="mt-2">
                  <Text className="text-sm text-gray-500">
                    {showReplies
                      ? 'Ocultar respuestas'
                      : `Ver respuestas (${comentario.replies!.length})`}
                  </Text>
                </TouchableOpacity>
              )}

              {showReplies &&
                comentario.replies!.map((reply) => (
                  <View key={reply.id} className="ml-5 mt-3 border-l-2 border-blue-200 pl-3">
                    <View className="flex-row items-center gap-2">
                      <View className="h-6 w-6 items-center justify-center rounded-full bg-blue-400">
                        <Text className="text-xs font-bold text-white">
                          {reply.user.username.charAt(0)}
                        </Text>
                      </View>
                      <Text className="text-sm font-semibold">{reply.user.username}</Text>
                    </View>
                    <Text className="mt-1 text-sm text-gray-700">{reply.content}</Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
      ))}

      {comentarioPadre && (
        <View className="px-4 pb-2">
          <View className="flex-row items-center justify-between rounded-md bg-blue-50 p-2">
            <Text className="text-sm text-blue-800">Respondiendo a un comentario...</Text>
            <TouchableOpacity onPress={() => setComentarioPadre(null)}>
              <Text className="text-sm text-red-500">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View className="flex-row items-center gap-2 px-4 py-3">
        <BottomSheetTextInput
          placeholder="Escribe un comentario..."
          className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-3 text-base"
          value={Comentario}
          onChangeText={setComentario}
        />
        <TouchableOpacity onPress={handleCommentPost} disabled={!Comentario.trim()}>
          <Ionicons
            name="send-outline"
            size={30}
            color={Comentario.trim() ? '#2563eb' : '#9ca3af'}
          />
        </TouchableOpacity>
      </View>
    </BottomSheetScrollView>
  );
};

export default PageComments;
