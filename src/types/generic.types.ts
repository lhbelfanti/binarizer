export interface KeyStringValue {
    [key: string]: any;
}

export type KeyValue<TValue> = {
  [key: string]: TValue;
};