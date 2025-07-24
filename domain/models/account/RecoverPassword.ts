import { CompanyModel } from '../CompanyModel';

export interface RecoverPassword {
  token: string;
  password: string;
  repeated: string;
}

export interface SendRecoverRequest extends CompanyModel {
  username: string;
}