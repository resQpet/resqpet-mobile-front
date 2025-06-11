import {isNil, omitBy} from 'lodash';
import {KeyValue, Optional, PlainValue} from "~/domain/types/steoreotype";

const routeSeparator: string = '/';

const predicate = (v: Optional<PlainValue>) => isNil(v);

export const joinURLParts = (baseURL: string, ...parts: string[]): string => {
    const partMapped = parts.join('/');
    return baseURL + partMapped.replaceAll("//", '/');
}

export const getURI = (baseURL?: string, params?: KeyValue): string => {
    const queryParams = JSON.parse(JSON.stringify(omitBy(params, predicate)));
    const query: string = new URLSearchParams(queryParams).toString();
    return `${baseURL}?${query}`
}

export const getParams = <T, >(object: T) => {
    return JSON.parse(JSON.stringify(omitBy(object as object, predicate)))
}

export const rootURI = (...routes: Array<PlainValue>) => {
    return routeSeparator.concat(routes.join(routeSeparator));
}