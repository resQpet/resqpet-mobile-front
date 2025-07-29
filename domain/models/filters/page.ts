import { EMPTY } from '~/domain/types/steoreotype';

export enum SortOrder {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class Pagination {
  page: number = 0;
  size: number = 10;
  field?: string = 'id';
  order?: SortOrder = SortOrder.DESC;

  static infinite: Pagination = {
    page: 0,
    size: 9999,
    field: 'id',
    order: SortOrder.DESC,
  };

  static default: Pagination = {
    page: 0,
    size: 10,
    field: 'id',
    order: SortOrder.DESC,
  };

  static empty<T>(): Page<T> {
    const empty: T = EMPTY<T>();
    return { ...empty, content: [] };
  }

  static of(page: number, size: number = 10): Pagination {
    return { page, size, order: SortOrder.ASC, field: 'id' };
  }

  static unsorted(page: number = 0, size: number = 10): Pagination {
    return { page, size };
  }

  static get first(): Pagination {
    return this.of(0);
  }

  static ofSize(size: number) {
    return this.of(0, size);
  }
}

export interface Page<T> {
  content: T[];
  page?: Pageable;
}

export class Pageable {
  size: number = 10;
  number: number = 0;
  totalElements: number = 0;
  totalPages: number = 1;
}