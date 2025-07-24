import { BaseService } from "../BaseService";
import { Comments,CreateComment } from "~/domain/model/publicaciones/Comment";

export class Comment extends BaseService {
    private static factory : Comment = new Comment();

    static get instance():Comment {
        return Comment.factory;
    }

    constructor(){
        super('/foundations/publications/comments')
    }

    async GetComments (publicationId:number): Promise<Comments>{
        return super.get<Comments>(`/${publicationId}`);
    }
    
    async PostComment (data:CreateComment): Promise <CreateComment>{
        return super.post('',data);
    }

    async UpdateComment (Commentid: number, content: string): Promise<Comments> {
        return this.put(`/${Commentid}`, {content});
    }

    async InativeComment(CommentId: number): Promise<void> {
        return this.put(`/${CommentId}/inactive`);
    }
}