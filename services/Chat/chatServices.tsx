import { ChatMessageRequest, MessagesChat } from "~/domain/models/Chat/ChatMessage";
import { BaseService } from "../BaseService";
import { chat, Chats } from "~/domain/models/Chat/ChatList";

export class ChatServices extends BaseService {
    private static Factory: ChatServices  = new ChatServices();

    static get instance (): ChatServices {
        return ChatServices.Factory;
    }
    constructor(){
        super('/chats');
    }

    async GetAllChat(UserId: number): Promise<Chats> {
        const cleanUserId = Number(String(UserId).replace(/\D/g, ''));
      return super.get<Chats>(`/threads`, { userId: cleanUserId });
    }

    async Getmessage(ChatId:number) : Promise<MessagesChat>{
        return super.get<MessagesChat>(`/messages/thread/${ChatId}`)
    }

    async PostMessages(payload: ChatMessageRequest): Promise<ChatMessageRequest> {
        return super.post<ChatMessageRequest>(`/messages`, payload);
    }
    async CreateChatThread(foundationId: number, subject: string): Promise<any> {
        const payload = { foundationId, subject };
    return super.post<any>(`/threads`, payload);
}
}