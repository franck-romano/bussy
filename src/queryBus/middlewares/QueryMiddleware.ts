import { ReadModel } from '../types/ReadModel';
import { Query } from '../types/Query';

export interface ChainableQueryMiddleware {
  handle: (query: Query) => Promise<ReadModel>;
}

export interface QueryMiddleware {
  chainWith(nextMiddleware: ChainableQueryMiddleware): ChainableQueryMiddleware;
}
