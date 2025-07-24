import { Model } from "../Model";
import { User } from "../users/user";

export interface Comments {
    content?:Comment[];
}

export interface Comment extends Model {
    user:User;
    content:string;
    replies?:Comment[];
}

export interface CreateComment {
    publicationId: number;
    content: string;
    parentCommentId?: number;
}