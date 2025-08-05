import { isNil } from 'lodash';
import * as SecureStore from 'expo-secure-store';
import { getURI, joinURLParts } from '~/utils/URIs';
import { TokenInfo } from '~/domain/models/auth/token';
import { KeyValue, KeyValueOf, nonNil, Nullable, PlainValue } from '~/domain/types/steoreotype';
import { Page, Pagination } from '~/domain/models/filters/page';
import { Environment } from '~/environment/Enviorement';
import { StorageItem } from '~/domain/types/storageItem';

export abstract class BaseService<R = unknown> {
  protected constructor(
    private readonly baseURL: string,
    private readonly isFull: boolean = false
  ) {}

  findOne<T>(filter: KeyValue = {}): Promise<T> {
    return this.get<T>('/lookup', filter);
  }

  create<T>(data: Partial<T>): Promise<R> {
    return this.post<R>('', data);
  }

  update<T, R>(id: number | undefined, data: Partial<T>): Promise<R> {
    return this.put<R>(`/${id}`, data ?? {});
  }

  deleteOne<R>(id: string | undefined): Promise<R> {
    return this.delete<R>(`/${id}`);
  }

  getOne(id?: string): Promise<R> {
    return this.get<R>(`/${id}`);
  }

  getAll(
    filters: Record<string, PlainValue> = {},
    pagination: Pagination = Pagination.default
  ): Promise<Page<R>> {
    return this.get<Page<R>>('', { ...pagination, ...filters });
  }

  protected get<T>(
    endpoint: string = '',
    params: KeyValue = {},
    headers: KeyValueOf<string> = {}
  ): Promise<T> {
    const url: string = getURI(
      (this.isFull ? '' : Environment.apiURL) + this.baseURL + endpoint,
      params
    );
    const options: RequestInit = { headers, method: 'GET' };
    return this.execRequest<T>(url, options);
  }

  protected post<T>(
    endpoint: string = '',
    body: any = {},
    headers: Record<string, string> = {}
  ): Promise<T> {
    const url: string = (this.isFull ? '' : Environment.apiURL) + this.baseURL + endpoint;
    const options: RequestInit = { method: 'POST', headers, body: JSON.stringify(body) };
    return this.execRequest<T>(url, options);
  }

  protected put<T>(
    endpoint: string = '',
    body?: any,
    headers: Record<string, string> = {}
  ): Promise<T> {
    const url: string = (this.isFull ? '' : Environment.apiURL) + this.baseURL + endpoint;
    const options: RequestInit = { method: 'PUT', headers, body: JSON.stringify(body) };
    return this.execRequest<T>(url, options);
  }

  protected delete<T>(endpoint: string = '', headers: Record<string, string> = {}): Promise<T> {
    const url: string = (this.isFull ? '' : Environment.apiURL) + this.baseURL + endpoint;
    const options: RequestInit = { method: 'DELETE', headers };
    return this.execRequest<T>(url, options);
  }

  protected form<T>(
    endpoint: string = '',
    data: any = {},
    headers: Record<string, string> = {}
  ): Promise<T> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key: string) => {
      formData.append(key, data[key]);
    });
    const url: string = getURI(joinURLParts(Environment.apiURL, this.baseURL, endpoint));
    const options: RequestInit = { method: 'POST', headers, body: formData };

    // DO NOT set Content-Type → fetch will do it
    return this.execRequest<T>(url, options, false);
  }

  protected postBlob(
    endpoint: string = '',
    body: any = {},
    headers: Record<string, string> = {}
  ): Promise<Blob> {
    const url: string = (this.isFull ? '' : Environment.apiURL) + this.baseURL + endpoint;
    const options: RequestInit = { method: 'POST', headers, body: JSON.stringify(body) };
    return this.execBlobRequest(url, options);
  }

  // ====== Core Methods ======

  private async execRequest<T>(
    url: string,
    options: RequestInit,
    isJson: boolean = true
  ): Promise<T> {
    // SecureStore → get token and companyRNC
    const info: Nullable<string> = await SecureStore.getItemAsync(StorageItem.TokenInfo);
    const token: Nullable<TokenInfo> = info ? JSON.parse(info) : {};
    const latitud: string = (await SecureStore.getItemAsync('latitud')) ?? '';
    const longitud: string = (await SecureStore.getItemAsync('longitud')) ?? '';
    const headers: KeyValueOf<string> = (options?.headers as KeyValueOf<string>) ?? {};
    isJson && (options.headers = { 'Content-Type': 'application/json', ...options.headers });
    isNil(headers.authorization) &&
      nonNil(token?.token) &&
      (options.headers = { authorization: 'Bearer ' + token?.token, ...options.headers });
    options.headers = { ...options.headers, ...{ 'X-Latitude': latitud, 'X-Longitude': longitud } };

    // Execute HTTP call
    return new Promise<T>((resolve, reject): void => {
      fetch(url, options)
        .then((response: Response) => this.handleResponse<T>(response))
        .then(resolve, reject)
        .catch(reject);
    });
  }

  private async execBlobRequest(url: string, options: RequestInit): Promise<Blob> {
    const info: Nullable<string> = await SecureStore.getItemAsync(StorageItem.TokenInfo);
    const token: Nullable<TokenInfo> = info ? JSON.parse(info) : {};

    const headers: KeyValueOf<string> = (options?.headers as KeyValueOf<string>) ?? {};
    const companyRNC: string = (await SecureStore.getItemAsync(StorageItem.CompanyRNC)) ?? '';

    options.headers = { 'Content-Type': 'application/json', ...options.headers };
    isNil(headers.authorization) &&
      nonNil(token?.token) &&
      (options.headers = { authorization: 'Bearer ' + token?.token, ...options.headers });
    Boolean(companyRNC) && (options.headers = { 'X-Auth-Company': companyRNC, ...options.headers });

    return new Promise<Blob>((resolve, reject): void => {
      fetch(url, options)
        .then((res: Response) => this.handleResponseBlob(res))
        .then(resolve, reject)
        .catch(reject);
    });
  }

  private async handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    try {
      const payload = text ? JSON.parse(text) : {};
      return Promise.reject(payload);
    } catch (e) {
      return Promise.reject({ status: res.status, message: res.statusText });
    }
  }

  const text = await res.text();

  if (!text) {
    return Promise.resolve(null as unknown as T);
  }

  try {
    const payload = JSON.parse(text);
    return Promise.resolve(payload as T);
  } catch (e) {
    return Promise.reject({ status: res.status, message: "Respuesta inválida (no es JSON)", error: e });
  }
}


  private async handleResponseBlob(res: Response): Promise<Blob> {
    if (!res.ok) {
      const text: string = await res.text();
      const payload: object = text ? JSON.parse(text) : {};
      return Promise.reject(payload);
    }
    try {
      const blob: Blob = await res.blob();
      return Promise.resolve(blob);
    } catch (e) {
      return Promise.reject({ status: res.status, message: res.statusText, error: e });
    }
  }

  private async getPayload<T>(res: Response): Promise<T> {
    try {
      return await res.json();
    } catch (e) {
      console.error(e);
      return Promise.reject({ status: res.status, message: res.statusText, error: e });
    }
  }
}
