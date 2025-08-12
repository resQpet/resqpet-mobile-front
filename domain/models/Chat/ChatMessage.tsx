import { Model } from "../Model"
import { User } from "../users/user"

export interface MessagesChat {
    content:Message[]
}

export interface Message extends Model {
    message:string
    senderUser:User
}

export interface ChatMessageRequest {
    chatThreadId: number;
    message?: string;
}