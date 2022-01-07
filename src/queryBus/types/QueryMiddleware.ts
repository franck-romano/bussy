import { Query } from './Query';
import { ReadModel } from './ReadModel';

export interface QueryMiddleware {
  handle(query: Query): Promise<ReadModel>;
}
