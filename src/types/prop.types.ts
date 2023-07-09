import { KeyStringValue } from "./generic.types";

export interface BaseProps {
    queryString?: KeyStringValue;
    title?: string;
}

export interface CookiesProps {
    cookies?: KeyStringValue;
}
  
export interface ViewProps<T = any> extends BaseProps, CookiesProps {
    //locals: Locals;
    children?: React.ReactNode | null;
    //user: UserProps;
  }
  