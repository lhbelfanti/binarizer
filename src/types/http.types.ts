import { Request, Response, NextFunction } from 'express';
import { KeyValue } from './generic.types';
import { UserInfo } from './user.types';

export interface HttpRequest<TBody = any> extends Request {
  body: TBody;
}

export interface HttpResponse extends Response {
  locals: Locals;
  permissions?: KeyValue<boolean>;
  render: (Component: any, props: any) => void;
}

export type HttpNext = NextFunction;

export interface Locals {
  userInfo: UserInfo;
}

export enum HttpStatus {
  OK = 200,
  NOT_FOUND = 400,
}
