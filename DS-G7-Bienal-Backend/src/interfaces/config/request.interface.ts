import { Request } from 'express';

export interface RequestInterface<T> extends Request {
  user: T;
}
