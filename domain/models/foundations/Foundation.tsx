import { FoundationLocation } from '~/domain/models/foundations/FoundationLocation';

export interface Foundation {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  foundedDate?: string;
  email?: string;
  phone?: string;
  website?: string;
  logo?: string;
  status?: string;
  locations?: FoundationLocation;
}
