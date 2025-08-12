import React, { useEffect, useRef, useState } from "react";
import {View,Text,TextInput,ScrollView,TouchableOpacity,KeyboardAvoidingView,Platform, SafeAreaView} from "react-native";
import { ChatBotService } from "~/services/Chatbot/ChatbotServices";
import { ChatResponse,ChatMessage } from "~/domain/models/chatbot/chatbot";
import { AppContainer } from "~/components/AppContainer";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export  default function ChatBotScreen  () {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const Router = useRouter()

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(scrollToBottom, [messages, typingMessage]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setTypingMessage(null);

    try {
      const response: ChatResponse = await ChatBotService.instance.send({
        reply: trimmed,
        messages: newMessages.slice(0, -1),
      });

      let i = 0;
      const text = response.reply;
      const typingInterval = setInterval(() => {
        setTypingMessage((prev) => (prev ?? "") + text.charAt(i));
        i++;
        if (i >= text.length) {
          clearInterval(typingInterval);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: text },
          ]);
          setTypingMessage(null);
          setLoading(false);
        }
      }, 20);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Error al contactar con el asistente.",
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5 py-8">
<KeyboardAvoidingView
        className="flex-1 p-4 "
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
      <View className="flex-row">

          <TouchableOpacity onPress={()=>{Router.push('/')}}>
              <Ionicons  
              name='arrow-back-circle'
              size={30} />
          </TouchableOpacity>
      
          <Text className="text-2xl font-bold text-center mb-4 text-gray-800">
              ResqPet IA
          </Text>

      </View>
        
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 bg-gray-200 rounded-xl p-4"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.map((msg, idx) => (
            <View
              key={idx}
              className={`mb-3 ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <View
                className={`px-4 py-3 rounded-xl max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-600 self-end"
                    : "bg-teal-500 self-start"
                }`}
              >
                <Text className="text-xs font-semibold text-white mb-1">
                  {msg.role === "user" ? "Tú" : "IA"}
                </Text>
                <Text className="text-white">{msg.content}</Text>
              </View>
            </View>
          ))}

          {typingMessage && (
            <View className="mb-3 items-start">
              <View className="px-4 py-3 rounded-xl max-w-[80%] bg-teal-500">
                <Text className="text-xs font-semibold text-white mb-1">IA</Text>
                <Text className="text-white">{typingMessage}</Text>
              </View>
            </View>
          )}
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
    </SafeAreaView>
      

  );
};