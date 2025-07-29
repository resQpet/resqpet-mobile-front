import { Gender } from '~/domain/models/users/user';

export interface RegisterUser {
    username: string;
    password: string;
    document: string;
    email: string;
    roleId: number;
    userInfo: {
        firstName: string;
        lastName: string;
        gender: Gender;
        country: string;
        city: string;
        birthDate: string;
        image: string;
    };
}