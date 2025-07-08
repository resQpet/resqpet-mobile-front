import {BaseService} from '~/services/BaseService';
import {AuthToken, TokenInfo, TokenResponse} from '~/domain/model/auth/token';
import {UserPasswordLogin} from '~/domain/model/auth/login';
import * as SecureStore from 'expo-secure-store';
import {StorageItem} from "~/domain/types/storageItem";
import base64 from 'react-native-base64';
import { KeyValue } from '~/domain/types/steoreotype';
import { Locations } from '../Location/LocationServices';

export class AuthService extends BaseService {
    private static factory: AuthService = new AuthService();

    static get instance(): AuthService {
        return AuthService.factory;
    }

    constructor() {
        super('/auth');
    }

    async authenticate({username, password}: UserPasswordLogin): Promise<AuthToken> {
        
        const request : KeyValue ={username,password,grant_type:'password'};
        const endpoint :string ='/token';

        const headers = {
            Authorization: `Basic ${base64.encode(`${username}:${password}`)}`
        };

        const {token} :TokenResponse = await this.form<TokenResponse>(endpoint,request,headers)

        const info: AuthToken = this.mapTokenToInfo(token);
        const tokenInfo :TokenInfo = {info,token};

        await SecureStore.setItemAsync(StorageItem.TokenInfo, JSON.stringify(tokenInfo));
        const coords = await Locations.instance.getLocation();

            if (coords) {

                 await SecureStore.setItemAsync('latitud', coords.latitud.toString());
                 await SecureStore.setItemAsync('longitud', coords.longitud.toString());
            }

        return info;
    }

    logout(): void {
        SecureStore.deleteItemAsync(StorageItem.TokenInfo).catch((err)=>
        console.log('error al eliminar token:',err));
    }

    async getCurrentToken(): Promise<AuthToken | undefined>{
        try{
            const stored = await SecureStore.getItem(StorageItem.TokenInfo);
            if(!stored)return undefined;
            const tokenInfo: TokenInfo = JSON.parse(stored);
            return tokenInfo.info;
        }
        catch(e){
            console.error('error leyendo el token:',e)
        }
    }

    private mapTokenToInfo(token: string): AuthToken {
        const base64Url: string = token.split('.')[1];
        const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload: string = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c: string): string => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        const payload = JSON.parse(jsonPayload);
        return {
            id: payload.sub,
            name: payload.user,
            role: payload.role,
            expiresAt: payload.exp * 1000,
        };
    }
}