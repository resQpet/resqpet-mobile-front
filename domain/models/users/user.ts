import { Model } from '../Model';
import { SelectOption } from '../../types/steoreotype';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export const GendersLabel: Record<keyof typeof Gender, string> = {
  MALE: 'Masculino',
  FEMALE: 'Femenino',
};

export const GenderOptions: SelectOption[] = Object.keys(Gender).map((key) => {
  return {
    value: key,
    description: GendersLabel[key as keyof typeof Gender],
  };
});

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CANCELLED = 'CANCELLED',
}

export const UserStatusLabel: Record<keyof typeof UserStatus, string> = {
  INACTIVE: 'Inactivo',
  CANCELLED: 'Cancelado',
  ACTIVE: 'Activo',
};

export const UserStatusOptions: SelectOption[] = Object.keys(UserStatus).map((key) => {
  return {
    value: key,
    description: UserStatusLabel[key as keyof typeof UserStatus],
  };
});

export interface User extends Model {
  username: string;
  email: string;
  document: string;

  info: UserInfo;
  status: UserStatus;
  role: UserRole;
}

export interface UserInfo extends Model {
  firstName: string;
  lastName: string;
  gender: Gender;
  country: string;
  city: string;
  birthDate: Date;
  image: string;
}

export interface UserRole {
  id: number;
  name: string;
  description: string;
  authorities?: Authority[];
}

export interface Authority {
  name: string;
}