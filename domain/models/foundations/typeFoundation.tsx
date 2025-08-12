import { Model } from "../Model";

export interface TypeFoundations {
    content:TypeFoundation[]
}

export interface TypeFoundation extends Model  {
    name: string;
    description: string;
}