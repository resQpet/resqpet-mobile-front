import { Foundation } from '~/domain/models/foundations/Foundation';
import { BaseService } from '~/services/BaseService';

export class FoundationService extends BaseService<Foundation> {
  private static factory: FoundationService = new FoundationService();

  static get instance(): FoundationService {
    return FoundationService.factory;
  }

  constructor() {
    super('/foundations');
  }

  async search(term: string): Promise<Foundation[]> {
    const result = await super.get<{ content: Foundation[] }>(
      `/search?term=${encodeURIComponent(term)}`
    );
    return result.content ?? [];
  }
}
