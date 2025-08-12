export type ChatRole = "user" | "assistant";

export interface ChatMessage {
    role: ChatRole;
    content: string;
}


export interface ChatRequest {
    messages: ChatMessage[];
}

export interface ChatResponse {
    reply: string;
    messages: ChatMessage[];
}