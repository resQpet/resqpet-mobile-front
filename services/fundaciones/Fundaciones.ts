import { BaseService } from '../BaseService';
import { Fundaciones } from '~/domain/models/fundaciones/fundaciones';
import { Foundation } from '~/domain/models/foundations/Foundation';

export class FundacionesService extends BaseService<Fundaciones> {
  private static factory: FundacionesService = new FundacionesService();

  static get instance(): FundacionesService {
    return FundacionesService.factory;
  }

  constructor() {
    super('/foundations');
  }

  async GetFundaciones(): Promise<Fundaciones[]> {
    return super.get<Fundaciones[]>();
  }

  async search(term: string): Promise<Foundation[]> {
    const result = await super.get<{ content: Foundation[] }>(
      `/search?term=${encodeURIComponent(term)}`
    );
    return result.content ?? [];
  }
}
