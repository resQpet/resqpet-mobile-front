import { Model } from "../Model";
import { Fundacion } from "../fundaciones/fundaciones";
import { Animal } from '~/domain/models/publication/Animal';
import { Imagen } from '~/domain/models/publication/Imagen';

export interface Publicaciones {
  content: Publicacion[];
}

export interface Publicacion extends Model {
  title: string;
  content: string;
  eventDate: string;
  foundation: Fundacion;
  animal?: Animal;
  images: Imagen[];
}
