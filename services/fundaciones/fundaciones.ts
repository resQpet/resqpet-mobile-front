import { Fundaciones } from "~/domain/model/fundaciones/fundaciones";
import { BaseService } from "../BaseService";

export class FundacionesService extends BaseService<Fundaciones> {
    private static factory: FundacionesService = new FundacionesService();

    static get instance():FundacionesService{
        return FundacionesService.factory;
    }

    constructor(){
        super('/foundations')
    }
    async GetFundaciones():Promise<Fundaciones>{
        return super.get<Fundaciones>()
    }
}