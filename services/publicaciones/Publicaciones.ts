import { Publicaciones } from "~/domain/model/publicaciones/publicaciones";
import { BaseService } from "../BaseService";

export class publicationsService extends BaseService<Publicaciones> {
      private static factory: publicationsService = new publicationsService();

      static get instance():publicationsService{
        return publicationsService.factory;
      }

      constructor(){
        super('/foundations/publications')
      }

      async GetPublicaciones(size=20):Promise<Publicaciones>{
            return super.get<Publicaciones>(`?size=${size}`)
      }
}