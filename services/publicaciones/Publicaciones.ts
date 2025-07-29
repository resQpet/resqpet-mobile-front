import { BaseService } from '../BaseService';
import { Publicaciones } from '~/domain/models/publication/Publicaciones';

export class publicationsService extends BaseService<Publicaciones> {
  private static factory: publicationsService = new publicationsService();

  static get instance(): publicationsService {
    return publicationsService.factory;
  }

  constructor() {
    super('/foundations/publications');
  }

  async GetPublicaciones(size = 20): Promise<Publicaciones> {
    return super.get<Publicaciones>(`?size=${size}`);
  }
}