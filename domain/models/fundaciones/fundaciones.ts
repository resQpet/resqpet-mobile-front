import { Model } from "../Model";

export interface Fundaciones {
    content: Fundacion[];
}
export interface location extends Model{
    country:string;
    city:string;
    address:string;
}

export interface Fundacion extends Model{
    name:string;
    founderDate:string;
    email:string;
    phone:string;
    website:string;
    memberCount:number;
    logo:string;
    status:string;
    locations:location[];
 }