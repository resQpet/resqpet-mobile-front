import {BaseService} from '~/services/BaseService';
import {AuthToken, TokenInfo, TokenResponse} from '~/domain/model/auth/token';
import {UserPasswordLogin} from '~/domain/model/auth/login';
import * as SecureStore from 'expo-secure-store';
import {StorageItem} from "~/domain/types/storageItem";
import base64 from 'react-native-base64';

export class AuthService extends BaseService {
    private static factory: AuthService = new AuthService();

    static get instance(): AuthService {
        return AuthService.factory;
    }

    constructor() {
        super('/auth');
    }

    async authenticate({username, password}: UserPasswordLogin): Promise<TokenResponse> {
        const headers = {
            Authorization: `Basic ${base64.encode(`${username}:${password}`)}`
        };

        const response = await this.post<TokenResponse>('/token', {}, headers);

        const tokenInfo: TokenInfo = {
            token: response.token,
            info: this.mapTokenToInfo(response.token),
        };

        await SecureStore.setItemAsync(StorageItem.TokenInfo, JSON.stringify(tokenInfo));

        return response;
    }

    async logout(): Promise<void> {
        await SecureStore.deleteItemAsync(StorageItem.TokenInfo);
        await SecureStore.deleteItemAsync(StorageItem.CompanyRNC);
    }

    async getCurrentToken(): Promise<TokenInfo | null> {
        const info = await SecureStore.getItemAsync(StorageItem.TokenInfo);
        return info ? JSON.parse(info) : null;
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
            company: payload.company,
            name: payload.user,
            role: payload.role,
            expiresAt: payload.exp * 1000,
        };
    }
}