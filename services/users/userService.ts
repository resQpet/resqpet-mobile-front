import {BaseService} from "~/services/BaseService";
import {User} from "~/domain/model/users/user";
import {RegisterUser} from "~/domain/model/auth/register";

export class UserService extends BaseService<User> {

    private static factory: UserService = new UserService();

    static get instance(): UserService {
        return UserService.factory;
    }

    constructor() {
        super('/users');
    }

    async current(): Promise<User> {
        return super.get<User>('/current');
    }

    async register(data: RegisterUser): Promise<User> {
        return this.post<User>('', data);
    }
}
