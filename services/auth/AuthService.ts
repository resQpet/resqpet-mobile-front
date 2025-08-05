import * as SecureStore from 'expo-secure-store';
import base64 from 'react-native-base64';
import { AuthToken, TokenInfo, TokenResponse } from '~/domain/models/auth/token';
import { BaseService } from '../BaseService';
import { KeyValue } from '~/domain/types/steoreotype';
import { UserPasswordLogin } from '~/domain/models/auth/login';
import { StorageItem } from '~/domain/types/storageItem';

export class AuthService extends BaseService {
  private static factory: AuthService = new AuthService();

  static get instance(): AuthService {
    return AuthService.factory;
  }

  constructor() {
    super('/auth');
  }

  async authenticate({ username, password }: UserPasswordLogin): Promise<AuthToken> {
    const request: KeyValue = {
      username,
      password,
      grant_type: 'password',
    };

    const endpoint = '/token';
    const headers = {
      Authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
    };

    const { token }: TokenResponse = await this.form<TokenResponse>(endpoint, request, headers);
    const info: AuthToken = this.mapTokenToInfo(token);

    const tokenInfo: TokenInfo = { info, token };
    await SecureStore.setItemAsync(StorageItem.TokenInfo, JSON.stringify(tokenInfo));

    return info;
  }

  logout(): void {
    SecureStore.deleteItemAsync(StorageItem.TokenInfo).catch(() => {
    });
  }

  getCurrentToken(): Promise<TokenInfo | undefined> {
    return SecureStore.getItemAsync(StorageItem.TokenInfo)
      .then((stored: string | null) => {
        if (!stored) return undefined;
        try {
          return JSON.parse(stored) as TokenInfo;
        } catch {
          return undefined;
        }
      })
      .catch(() => undefined);
  }

  private mapTokenToInfo(token: string): AuthToken {
    const base64Url = token.split('.')[1];
    const base64Str = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64Str)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
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
