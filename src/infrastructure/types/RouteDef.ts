import { RequestHandler } from 'express';
import { Controller } from './Controller';

export type RouteDef<Q, R> = {
  method: 'get' | 'post' | 'put' | 'delete',
  path: string,
  controller: Controller<Q, R>,
  middleware?: RequestHandler[],
  weight?: number,
}
