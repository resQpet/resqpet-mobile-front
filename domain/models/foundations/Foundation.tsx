import { FoundationLocation } from '~/domain/models/foundations/FoundationLocation';
import { Model } from '../Model';

export interface Foundations {
  content : Foundation[];
}

export interface Foundation extends Model{
  name: string;
  foundedDate?: string;
  email?: string;
  phone?: string;
  website?: string;
  logo?: string;
  status?: string;
  locations?: FoundationLocation;
  memberCount?:number
}
