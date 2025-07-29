import { BaseService } from './BaseService';

const baseRestPetURL: string = 'https://RestPet/api/v1';

export class RestPetService extends BaseService {
  private static factory: RestPetService = new RestPetService();

  static get instance(): RestPetService {
    return RestPetService.factory;
  }

  constructor() {
    super(baseRestPetURL, true);
  }

  getRNCInfo(rnc: string) {
    return super.get('/companies/rnc-info', { rnc });
  }

  async isRNCValid(rnc?: string) {
    return this.getRNCInfo(rnc ?? '').then(
      () => true,
      () => false
    );
  }
}
