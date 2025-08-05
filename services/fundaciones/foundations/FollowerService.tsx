import { BaseService } from "~/services/BaseService";
import { OnFollowFoundation,FoundationFollowsCount } from "~/domain/models/foundations/Follows";


export class FollowerServices extends BaseService {

    private static Factory = new FollowerServices();

    static get instance() {
        return FollowerServices.Factory;
    }

    constructor(){
        super('/foundations')
    }

    async getOnfollow (IdFoandation: number) : Promise<OnFollowFoundation>{
        return super.get<OnFollowFoundation>(`/${IdFoandation}/follows`);
    }

    async getCountFollow (IdFoandation: number) : Promise<FoundationFollowsCount>{
        return super.get<FoundationFollowsCount>(`/${IdFoandation}/follows/count`);
    }

    async PostFollow (IdFoandation: number): Promise<void>{
        return super.post(`/${IdFoandation}/follows`)
    }
    
    async DeleteFollow (IdFoandation:number): Promise<void>{
        return super.put(`/${IdFoandation}/follows`)
    }
}