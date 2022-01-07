import { Query } from './Query';
import { ReadModel } from './ReadModel';

export abstract class QueryMiddleware {
  public abstract handle(query: Query): Promise<ReadModel>;
}
