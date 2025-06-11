import {Dispatch, MutableRefObject, SetStateAction} from "react";
import {FieldValues, UseFormReturn} from "react-hook-form";
import {isEmpty, isNil} from "lodash";

export type NumericString = string | number;
export type RecordValue = string | number | symbol;
export type PlainValue = NumericString | boolean;
export type SimpleFilter = KeyValueOf<PlainValue>;
export type Null<T> = T | null;
export type Optional<T> = T | undefined;
export type Nullable<T> = Optional<T> | null;
export type UseForm<T extends FieldValues> = UseFormReturn<T>;

export type State<S, > = [S, Dispatch<SetStateAction<S>>] | [Optional<S>, Dispatch<SetStateAction<Optional<S>>>];
export type Reference<T> = MutableRefObject<T>;
export type KeyLabel = { value: PlainValue, label: string };
export type FormOption = { key: PlainValue, value: string };
export type KeyValue = Record<string, Optional<PlainValue>>;
export type KeyValueOf<T> = Record<string, T>;
export type SimpleFunction<T> = (info: T) => void;
export type ResultResponse<T> = { result: T }
export type NumArray = Array<number>;
export type SelectOption = { value: PlainValue, description: string };

export const EMPTY = <T, >() => ({} as T);
export const PARTIAL = <T, >({...props}: object) => ({...props} as T);
export const VOID = () => void 0;
export const nonNil = (value: any) => !isNil(value);
export const nonEmpty = (value?: string) => !isEmpty(value?.trim());