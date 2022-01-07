import { ReadModel } from './ReadModel';
import { Query } from './Query';

export interface QueryMiddlewareHandler {
  handle: (query: Query) => Promise<ReadModel>;
}

export interface QueryMiddleware {
  chainWith(nextMiddleware: QueryMiddlewareHandler): QueryMiddlewareHandler;
}
