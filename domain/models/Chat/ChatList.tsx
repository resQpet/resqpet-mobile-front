import { Foundation } from "../foundations/Foundation";
import { Model } from "../Model";
import { User } from "../users/user";

export interface Chats{
    content:chat[]
}

export interface chat extends Model{
    status: string;
    subject : string;
    user: User
    foundation : Foundation
}
