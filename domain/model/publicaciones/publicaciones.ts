import { Model } from "../Model";
import { Fundacion } from "../fundaciones/fundaciones";

export interface Publicaciones {
  content: Publicacion[]; 
}

export interface imagenes extends Model{
    imageUrl: string;
}

export interface animales extends Model{
    name:string;
    species:string;
    gender:string;
    ageMounths:number;
    size:string;
    color:string;
    status:string
}

export interface Publicacion extends Model {
    title: string;
    content: string;
    eventDate: string;
    foundation: Fundacion;
    animal:animales[];
    images: imagenes[];
};
