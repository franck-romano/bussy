import { ReadModel } from '../types/ReadModel';
import { Query } from '../types/Query';

export interface QueryMiddlewareHandler {
  handle: (query: Query) => Promise<ReadModel>;
}

export interface QueryMiddleware {
  chainWith(nextMiddleware: QueryMiddlewareHandler): QueryMiddlewareHandler;
}
