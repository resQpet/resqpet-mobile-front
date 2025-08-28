import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChatServices } from "~/services/Chat/chatServices";
import { ChatMessageRequest } from "~/domain/models/Chat/ChatMessage";
import { UserService } from "~/services/users/UserService";
import { User } from "~/domain/models/users/user";
import { Message } from "~/domain/models/Chat/ChatMessage";
import Toast from "react-native-toast-message";

export default function Chat() {
  const { ID } = useLocalSearchParams();
  const ChatId = Number(ID);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  useEffect(() => {
    UserService.instance.current()
      .then((user) => {
        setCurrentUserId(user.id);
      })
  }, []);

  useEffect(() => {
    if (currentUserId === null) return;

    ChatServices.instance
      .Getmessage(ChatId)
      .then((data) => {
        const mappedMessages: Message[] = data.content.map((m: any) => ({
          id: m.id,
          message: m.message,
          senderUser: m.senderUser,
           createdAt:
              m.createdAt instanceof Date ? m.createdAt.toISOString() : m.createdAt,
          updatedAt:
              m.updatedAt instanceof Date ? m.updatedAt.toISOString() : m.updatedAt,
        }));
        setMessages(mappedMessages);
      })
      
  }, [ChatId, currentUserId]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || currentUserId === null) return;

    setLoading(true);

    const payload: ChatMessageRequest = {
      chatThreadId: ChatId,
      message: input.trim(),
    };

    ChatServices.instance
      .PostMessages(payload)
      .then(() => {
        const newUserMessage: Message = {
          id: Date.now(),
          message: input.trim(),
          senderUser: { id: currentUserId, username: "Tú" } as User,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInput("");
      })
      .catch((error) => {
        Toast.show({type:'error',
                     text1:'error al enviar mensaje'
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white py-8">
      <View className="flex-1 bg-white">
        <KeyboardAvoidingView
          className="flex-1 p-4"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => router.push("/")}>
              <Ionicons name="arrow-back-circle" size={30} color="black" />
            </TouchableOpacity>

            <Text className="flex-1 text-2xl font-bold text-center text-gray-800">
              Fundacion
            </Text>
          </View>

          <ScrollView
            ref={scrollViewRef}
            className="flex-1 bg-gray-200 rounded-xl p-4"
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {messages.map((msg) => {
              const isUser = msg.senderUser.id === currentUserId;
              return (
                <View
                  key={msg.id}
                  className={`mb-3 ${isUser ? "items-end" : "items-start"}`}
                >
                  <View
                    className={`px-4 py-3 rounded-xl max-w-[80%] ${
                      isUser
                        ? "bg-blue-600 self-end"
                        : "bg-teal-500 self-start"
                    }`}
                  >
                    <Text className="text-xs font-semibold text-white mb-1">
                      {isUser ? "Tú" : msg.senderUser.username}
                    </Text>
                    <Text className="text-white">{msg.message}</Text>
                  </View>
                </View>
              );
            })}

          </ScrollView>

          <View className="flex-row mt-4">
            <TextInput
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 bg-white text-base mr-2"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={handleSend}
              disabled={loading}
              className="bg-blue-600 px-4 py-2 rounded-xl justify-center"
            >
              <Text className="text-white font-semibold">Enviar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
