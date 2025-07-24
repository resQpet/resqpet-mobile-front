import { BaseService } from '../BaseService';
import { Fundaciones } from '~/domain/models/fundaciones/fundaciones';

export class FundacionesService extends BaseService<Fundaciones> {
  private static factory: FundacionesService = new FundacionesService();

  static get instance(): FundacionesService {
    return FundacionesService.factory;
  }

  constructor() {
    super('/foundations');
  }

  async GetFundaciones(): Promise<Fundaciones> {
    return super.get<Fundaciones>();
  }

}
