import {  Foundations, Foundation } from '~/domain/models/foundations/Foundation';
import { TypeFoundation, TypeFoundations } from '~/domain/models/foundations/typeFoundation';
import { Publicacion, Publicaciones } from '~/domain/models/publication/Publicaciones';
import { BaseService } from '~/services/BaseService';

export class FoundationService extends BaseService<Foundations> {
  private static factory: FoundationService = new FoundationService();

  static get instance(): FoundationService {
    return FoundationService.factory;
  }

  constructor() {
    super('/foundations');
  }

  async search(term: string): Promise<Foundations[]> {
    const result = await super.get<{ content: Foundations[] }>(
      `/search?term=${encodeURIComponent(term)}`
    );
    return result.content ?? [];
  }
  
  async GetfoundationInfo (IdFoandation:number): Promise<Foundation>{
    return super.get<Foundation>(`/${IdFoandation}`)
  }

  async getfoundationPublication(IdFoandation:number): Promise<Publicaciones>{
    return super.get<Publicaciones>(`/publications/${IdFoandation}/list`)
  }

  async GetFundaciones(): Promise<Foundations> {
      return super.get<Foundations>();
    }
  
  async GetTypeFoundations(): Promise<TypeFoundations>{
    return super.get<TypeFoundations>('/types')
  }

}
