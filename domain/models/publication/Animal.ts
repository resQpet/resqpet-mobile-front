import { Model } from "../Model";

export interface Animal extends Model {
  age: any;
  name: string;
  species: string;
  gender: string;
  ageMounths: number;
  size: string;
  color: string;
  status: string;
}