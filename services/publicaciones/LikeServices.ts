import { BaseService } from '../BaseService';
import { LikeCount, LikeTrue } from '~/domain/models/publication/Likes';

export class Likers extends BaseService {
  private static factory: Likers = new Likers();

  static get instance(): Likers {
    return Likers.factory;
  }

  constructor() {
    super('/publications');
  }

  async GetLikeTrue(publicationid: number): Promise<LikeTrue> {
    return super.get<LikeTrue>(`/${publicationid}/likes`);
  }

  async GetLikersCount(publicationid: number): Promise<LikeCount> {
    return super.get<LikeCount>(`/${publicationid}/likes/count`);
  }
  async GetMultipleLikerCount(publicationids: number[]): Promise<LikeCount[]> {
    return Promise.all(publicationids.map((id) => this.GetLikersCount(id)));
  }
  async PostLike(publicationid: number): Promise<void> {
    return this.post(`/${publicationid}/likes`);
  }

  async deleteLike(publicationId: number): Promise<void> {
    return this.put(`/${publicationId}/likes`);
  }
}