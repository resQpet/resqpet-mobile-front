import {BaseService} from "../BaseService";
import { ChatMessage,ChatResponse } from "~/domain/models/chatbot/chatbot";

export class ChatBotService extends BaseService<any> {
    private static factory: ChatBotService = new ChatBotService();

    static get instance(): ChatBotService {
        return ChatBotService.factory;
    }

    constructor() {
        super("/ia");
    }

    async send(payload: { reply: string; messages: ChatMessage[] }): Promise<ChatResponse> {
        const clean = {
            reply: payload.reply.trim(),
            messages: payload.messages
                .filter((m) => typeof m.content === "string" && m.content.trim() !== "")
                .map((m) => ({ role: m.role, content: m.content.trim() })),
        };

        return this.post<ChatResponse>("", clean);
    }

    


}